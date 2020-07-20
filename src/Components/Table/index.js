import React, { Component } from 'react'
import 'datatables.net';
import 'datatables.net-scroller'
import "./index.css"
const $ = require('jquery');
$.DataTables = require('datatables.net')

export default class Table extends Component{

    constructor(props){
        super(props)
        this.state={loadData:[]}
    }

    componentDidMount() {
        $(this.refs[this.props.id]).DataTable({
           "pagingType": "full_numbers",
           "retrieve": true,
            columns:this.props.columns,
            data:this.props.data,
            "scrollX": true,
            columnDefs: [{
                targets: this.props.actionTarget>-1?this.props.actionTarget:0,
                createdCell: this.props.actionTarget>-1?this.props.actionFunction:null
            }],
            pageLength: 50,
            responsive: true,
            language: {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "Mostrando _MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                },
                "select": {
                    "rows": {
                        "_": "Selecionado %d linhas",
                        "0": "Nenhuma linha selecionada",
                        "1": "Selecionado 1 linha"
                    }
                }
            },
            dom: 'Bfrtip',
            buttons: this.props.relatorio?['copyHtml5','excelHtml5','csvHtml5','pdfHtml5']:[],
           
        });
        if(this.props.selectAllFunction!=undefined){
            var old_element = this.refs[this.props.id].childNodes[1].childNodes[0].childNodes[4]
            var new_element = old_element.cloneNode(true);
            //console.log(this.props.selectAllFunction)
            old_element.parentNode.replaceChild(new_element, old_element);
            this.refs[this.props.id].childNodes[1].childNodes[0].childNodes[4].addEventListener('click', 
                this.props.selectAllFunction
            , false)
        }
    }

    componentWillReceiveProps(nextProps){
        console.log("ATT")
        //console.log(nextProps.data)
        //console.log(this.props.data)
        //console.log(nextProps.data!==this.props.data)
        if(nextProps.data!==this.props.data){
            $(this.refs[this.props.id]).DataTable().clear()
            $(this.refs[this.props.id]).DataTable({
            "pagingType": "full_numbers",
            "retrieve": true,
            "scrollX": this.props.scrollX?true:false,
                columns:this.props.columns,
                data:nextProps.data,
                columnDefs: [{
                    targets: this.props.actionTarget>-1?this.props.actionTarget:0,
                    createdCell: this.props.actionTarget>-1?this.props.actionFunction:null
                }],  
                pageLength: 10,
                responsive: true,
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    },
                    "select": {
                        "rows": {
                            "_": "Selecionado %d linhas",
                            "0": "Nenhuma linha selecionada",
                            "1": "Selecionado 1 linha"
                        }
                    }
                }
            });
            
            $(this.refs[this.props.id]).DataTable().rows.add(nextProps.data).draw()
            if(this.props.selectAllFunction!=undefined){
                var old_element = this.refs[this.props.id].childNodes[1].childNodes[0].childNodes[4]
                var new_element = old_element.cloneNode(true);
                //console.log(this.props.selectAllFunction)
                old_element.parentNode.replaceChild(new_element, old_element);
                this.refs[this.props.id].childNodes[1].childNodes[0].childNodes[4].addEventListener('click', 
                    this.props.selectAllFunction
                , false)
            }
        }
    }

    componentWillUnmount(){
       $(this.refs[this.props.id])
       .DataTable()
       .destroy(true);
    }

    render(){
        
        return(
            <div className="containerTable">
                    <div className="titlebotao">
                        <div className="title">{this.props.title}</div>
                        <div>{this.props.actionTop}</div>
                    </div>                    
                    <div style={{marginTop: 10}} className="table">
                        <table ref={this.props.id} className="display compact nowrap" style={{width:"100%"}}>
                            <tbody  className="tbody">
                            </tbody>
                        </table>
                    
                    </div>
            </div>
        )
    }
}