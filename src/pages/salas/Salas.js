import React, { Component } from 'react'
import {Button } from 'react-bootstrap'
import NewRoom from './Modais/newRoom'
import Table  from './../../Components/Table/index'
import ReactDOM from "react-dom"
import * as SignalR from '@microsoft/signalr'
import { buscaSalasAbertas, criarSala } from './funcoes'
import { connect } from 'react-redux'
import { setConnection } from '../../Reducer/wsReducer'
class Salas extends Component {

    constructor(props){
        super(props)
        this.state={
            salas:[],
            modal:<></>,
            usuarios:[],
            con: null
        }
    }

    buscaDadosIniciais = async() =>{
        let resultado = await buscaSalasAbertas()
        resultado.map(d=>{
            d["action"]=""
        })
        this.setState({salas: resultado})
    }

    componentDidMount = () =>{
        this.setUpSignalRConnection();
        this.buscaDadosIniciais();
    }

    abrirSala = async (e) =>{
        let resultado = await criarSala(e.sala)
        if(resultado!=""){
            this.limpaModal();
            this.state.con.invoke('CriarSala', "OpenRoom").catch((err) => {
                return console.error(err.toString());
            });
            this.props.history.push("/jogo/"+resultado);
        }
    }


    openModal = () =>{
        this.setState({modal: <NewRoom
                                limpaModal={()=>this.limpaModal()}
                                onSubmit={(e)=>this.abrirSala(e)}
                                ></NewRoom>})
    }

    limpaModal = () =>{
        this.setState({modal: null})
    }

    setUpSignalRConnection = async (boardId) => {
        //Cria a conexão com o websocket
        const connection = new SignalR.HubConnectionBuilder()
        .withUrl('http://localhost:6016/jogo',{
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => localStorage.getItem("token")
        })
        .withAutomaticReconnect()
        .build();
    
        this.setState({con: connection},()=>{
            console.log(this.state.con)
        })

        //Chama as funções do websocket
        connection.on('Message', (message) => {
            console.log('Message', message);
        });

        connection.on('CriarSala', (message) => {
            message.map(d=>{
                d["action"]=""
            })
            console.log(message)
            this.setState({salas: message})
        });

        connection.on('listausuarios', (message) => {
            message.map(d=>{
                d["action"]=""
            })
            console.log(message)
            this.setState({usuarios: message})
        });

        try {
          await connection.start({ withCredentials: false });
        } catch (err) {
          console.log(err);
        }
    
        //Se conectou, inscreve o usuário no quadro  
        if (connection.state === SignalR.HubConnectionState.Connected) {
            this.props.criarConexao(connection)
        }
            
        return connection;
      };

    mandarMSG=()=>{
        this.state.con.invoke('Message', "OLA EVERY BODY").catch((err) => {
            return console.error(err.toString());
        });
    }

    entrarSala = rowData =>{
        this.props.history.push("/jogo/"+rowData.idsala);
    }

    render() {
        return (
            <>
                <Table 
                    id={"backlog1"} 
                    title={"Salas Abertas"} 
                    data={this.state.salas} 
                    columns={[
                        {title:"ID",data:"id"},
                        {title:"Nome Sala",data:"nomesala"},
                        {title:"Dono Sala",data:"donosala"},
                        {title:"Ação",data:"action"}
                    ]}
                    actionTarget={3} 
                    actionFunction={(td, cellData, rowData, row, col)=>{
                    ReactDOM.render(<><div style={{display:"flex",justifyContent:"space-around"}}>
                        <Button style={{ cursor: 'pointer' ,borderRadius:"1000px"}}
                        onClick={() => {this.entrarSala(rowData)}}>
                        Entrar
                        </Button>
                    </div></>, td)}}

                    relatorio={false}
                    actionTop={<Button onClick={()=>this.openModal()}>Criar Sala</Button>}
                ></Table>

                <div>
                    <label>Usuários Online</label>
                    {this.state.usuarios.map(d=>{
                        return <div>{d.nome}</div>
                    })}
                </div>
                {this.state.modal}
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
       _con: state.wsReducer.wsConnection
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // dispatching plain actions
        criarConexao: (e) => dispatch(setConnection(e)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Salas)