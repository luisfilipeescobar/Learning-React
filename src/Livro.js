import React, { Component } from 'react';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';
import InputCustomizado from './componentes/inputCustomizado';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormBooks extends Component{
    
            constructor() {
              super();
              this.state = {titulo:'',preco:'',autorId:''};
              this.enviaForm = this.enviaForm.bind(this);
              this.setTitulo = this.setTitulo.bind(this);
              this.setPreco = this.setPreco.bind(this);
              this.setAutorId = this.setAutorId.bind(this);
              }
    
    enviaForm(evento){
        evento.preventDefault();
        $.ajax({
          url:"http://localhost:8080/api/livros",
          contentType: 'application/json',
          dataType:'json',
          type: 'post',
          data:JSON.stringify({titulo:this.state.titulo,preco:this.state.preco,autorId:this.state.autorId}),
          success:function(novaListagem){
            PubSub.publish('atualiza-lista-livros',novaListagem);  //Dispara um aviso geral de novaListagem disponivel
            this.setState({titulo:'',preco:'',autorId:''});
        }.bind(this),
          error: function(resposta){
              if(resposta.status === 400){
                new TratadorErros().publicaErros(resposta.responseJSON);
              }
          },
          beforeSend: function(){
            PubSub.publish("limpa-erros",{});
          }
        })
      }
      
        setTitulo(evento){        //Pegando informação do input Nome
          this.setState({titulo:evento.target.value});
        }
        setPreco(evento){       //Pegando informação do input Email
          this.setState({preco:evento.target.value});
        }
        setAutorId(evento){       //Pegando informação do input Senha
          this.setState({autorId:evento.target.value});
        }
      
    
        render(){
            return(
            <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
            <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Title"/>                                              
            <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Price"/>                                              
            <div className="pure-control-group">
                <label htmlFor="autorId">Autor</label>            
            <select name="autorId" id="autorId" onChange={this.setAutorId}>
                <option value="">Choose Author</option>
                {
                    this.props.autores.map(function(autor){
                        return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                    })
                }
            </select>
            </div>
                 <div className="pure-control-group">                                  
                <label></label>
                <BotaoSubmitCustomizado label="Record"/>                                    
            </div>
            </form>        
    
            </div>  
            );
        }
    
    }


class Tablebooks extends Component{
    render(){
        return(
            <div>          
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.lista.map(function(livro){
                    return (
                      <tr key={livro.id}>
                        <td>{livro.titulo}</td>
                        <td>{livro.preco}</td>
                        <td>{livro.autor.nome}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table> 
          </div>            
        );
    }
    
}

export default class LivroBox extends Component{
    constructor() {
        super();
        this.state = {lista:[],autores:[]};
        }

    componentDidMount(){
        $.ajax({
            url:"http://localhost:8080/api/livros",
            dataType: 'json',
            success:function(resposta){
            this.setState({lista:resposta});
            }.bind(this)
        }
    );
    $.ajax({
        url:"http://localhost:8080/api/autores",
        dataType: 'json',
        success:function(resposta){
        this.setState({autores:resposta});
         }.bind(this)
     }
);
    PubSub.subscribe('atualiza-lista-livros',function(topico,novaLista){
        this.setState({lista:novaLista});
    }.bind(this));
}


    render(){
        return(
            <div>
                    <div className="header">
                        <h1>Books Registration</h1>
            </div>
            <div className="content" id="content">
            <FormBooks autores={this.state.autores}/>
            <Tablebooks lista={this.state.lista}/>
            </div>
            </div>
        );
    }
}