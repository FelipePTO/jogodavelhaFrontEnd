import React, { Component } from 'react'
import './style.css'
import { Button } from 'react-bootstrap';
import { setConnection } from '../../Reducer/wsReducer';
import { connect } from 'react-redux';

class JogoVelha extends Component {

    constructor(props){
        super(props);
        this.state={
            "um": "",
            "dois": "",
            "tres": "",
            "quatro": "",
            "cinco": "",
            "seis": "",
            "sete": "",
            "oito": "",
            "nove": "",
            jogadores:{}
        }
    }

    pressionaJogada = e =>{
        var idurl = this.props.match.params.id;

        this.props._con.invoke('fazerJogada', idurl, e.target.id).done(e=>{
            console.log(e)
        }).catch((err) => {
            return console.error(err.toString());
        });
    }

    componentDidMount(){
        var idurl = this.props.match.params.id;
        
        if(this.props._con==""){
            this.props.history.push("/salas");
        }else{
            this.props._con.on("UsuariosSala", (message) => {
                console.log('Message', message);
                this.setState({jogadores: message})
            });
    
            this.props._con.invoke('EntrarSala', idurl).catch((err) => {
                this.props.history.push("/salas");
                return console.error(err.toString());
            });
        }
    }
    
    sairSala(){
        var idurl = this.props.match.params.id;
        this.props._con.invoke('SairSala', idurl).then(d=>{
            this.props.history.push("/salas");
        }).catch((err) => {
            return console.error(err.toString());
        });
        
    }

    render() {
        return (
            <>
            <div><Button onClick={()=>this.sairSala()} >Sair da Sala</Button></div>
            <label>Jogadores</label>
            <div>{this.state.jogadores.jogador1==null?"":this.state.jogadores.jogador1}</div>
            <div>{this.state.jogadores.jogador2==null?"":this.state.jogadores.jogador2}</div>

            <div className="containerJogoVelha">
                <div className="linhaJogoVelha">
                    <div id="1" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.um}
                    </div>
                    <div id="2" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.dois}
                    </div>
                    <div id="3" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.tres}
                    </div>
                </div>
                <div className="linhaJogoVelha">
                    <div id="4" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.quatro}
                    </div>
                    <div id="5" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.cinco}
                    </div>
                    <div id="6" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.seis}
                    </div>
                </div>
                <div className="linhaJogoVelha">
                    <div id="7" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.sete}
                    </div>
                    <div id="8" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.oito}
                    </div>
                    <div id="9" onClick={(e)=>this.pressionaJogada(e)} className="ColunaJogoVelha">
                            {this.state.nove}
                    </div>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log(state, props)
    return {
       _con: state.wsReducer.wsConnection
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // dispatching plain actions
        criarConexao: (e) => dispatch((e)=>setConnection(e)),
        //decrement: () => dispatch({ type: 'DECREMENT' }),
        //reset: () => dispatch({ type: 'RESET' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JogoVelha)