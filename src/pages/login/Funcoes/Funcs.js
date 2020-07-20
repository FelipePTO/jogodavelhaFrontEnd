import Axios from "axios";

export const FazLogin = async(usuario) =>{
    let retorno = false;
    await Axios.get("http://localhost:6016/api/jogo/loginUsuario/"+usuario).then(d=>{
        console.log(d.data)
        if(d.data.status=="OK"){
            let token = d.data.resultado;
            localStorage.setItem("token", token)
            retorno = true;
        }
        else
            alert("Erro para criar o usuário")
    }).catch(err=>{
        console.log(err);
    })
    return true;
}