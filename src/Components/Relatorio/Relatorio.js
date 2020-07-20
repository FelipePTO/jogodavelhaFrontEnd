import React, { Component } from 'react'
import ContainerMaster from '../Container/ContainerMaster'
import Table from '../Table'
import { Button } from 'react-bootstrap'
import Axios from 'axios'

export default class Relatorio extends Component {
    constructor(props){
        super(props)
        this.state={
            dados: [],
            showmodal: true,
            modal: <></>,
            load:false
        }
    }

    atualizaDados = async (e) =>{
        let token = localStorage.getItem("token");
        if(token==null){
            return
        }
        let dados = JSON.stringify(e);
        await Axios.post(this.props.url, dados, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            },
        }).then(d=>{
            this.setState({dados: d.data})
        }).catch(err=>{
            console.log(err)
            alert("Não foi possível extrair o relatório");
        })
    }

    AplicarFiltros = async(e) =>{
        await this.atualizaDados(e);
        this.setState({modal:<></>})
    }

    openModal = () =>{
        //Adiciona a funcionalidade de limparmodal
        let novomodal = React.cloneElement(
            this.props.modal, 
            { 
                limpaModal: ()=>this.limpaModal(),
                onSubmit:(e)=>this.AplicarFiltros(e)
            }
        );
        this.setState({modal: novomodal})
    }

    componentDidMount = () =>{
        this.openModal();
    }
        

    limpaModal = () =>{
        this.setState({modal: null})
    }

    render() {
        return (
            <ContainerMaster>
                <Table 
                    id={"backlog1"} 
                    title={this.props.titulo} 
                    data={this.state.dados} 
                    columns={this.props.colunas} 
                    relatorio={true}
                    actionTop={<Button onClick={()=>this.openModal()}>Filtros</Button>}
                ></Table>
                {this.state.modal}
            </ContainerMaster>
        )
    }
}
