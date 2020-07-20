import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Formik } from 'formik'
import { FazLogin } from './Funcoes/Funcs'

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            nickName: ""
        }
    }

    entrarSala = async (e) =>{
        if(e.nickName!=""){
            let resultado = await FazLogin(e.nickName);
            console.log(resultado)
            if(resultado == true)
                this.props.history.push("/salas")
            
        }
        console.log(e)
    }

    render() {
        return (
            <Formik
            initialValues={{ nickName: ""}}
            onSubmit={async values => {
                this.entrarSala(values)
            }}
            >
            {props => {
                const {
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
                } = props;
                return (
                <form onSubmit={handleSubmit}>
                    <div className="login">
                        <div className="boxlogin">
                        <label>Insira o usuário:</label>
                        <input
                            id="nickName"
                            name="nickName"
                            placeholder="Nome do usuário"
                            type="text"
                            value={values.nickName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />                
                        <Button type="submit" >Entrar</Button>
                        </div>
                    </div>
                </form>
                )
            }}
            </Formik>
        )
    }
}
