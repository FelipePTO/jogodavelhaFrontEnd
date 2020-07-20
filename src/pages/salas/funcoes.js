import Axios from "axios"

export const buscaSalasAbertas = async() =>{
    let resultado = []
    await Axios.get("http://localhost:6016/api/jogo/ListarSalasAbertas",{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("token")
        }
    }).then(d=>{
        resultado=d.data
    }).catch(err=>{
        alert("Erro para listar Salas")
    });
    return resultado;
}

export const criarSala = async(nomesala)=>{
    let resultado = "";
    let obj = {
        nomesala
    }
    await Axios.post("http://localhost:6016/api/jogo/CriarSala",JSON.stringify(obj), {
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("token"),
            "Content-Type":"application/json"
        }
    }).then(d=>{
         if(d.data.status=="OK"){
            resultado = d.data.resultado;
         }
    }).catch(err=>{
        alert("Erro para criar a sala")
    })
    return resultado;
}