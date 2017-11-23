import React, { Component } from 'react';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';
import InputCustomizado from './componentes/inputCustomizado';
import $ from 'jquery';


class FormAuthor extends Component{

        constructor() {
          super();
          this.state = {nome:'',email:'',senha:''};
          this.enviaForm = this.enviaForm.bind(this);
          this.setNome = this.setNome.bind(this);
          this.setEmail = this.setEmail.bind(this);
          this.setSenha = this.setSenha.bind(this);
          }

enviaForm(evento){
    evento.preventDefault();    
    $.ajax({
      url:"https://cdc-react.herokuapp.com/api/autores",
      contentType: 'application/json',
      dataType:'json',
      type: 'post',
      data:JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      sucess:function(resposta){
      }.bind(this),
      error: function(resposta){
          alert("Error")
      }
    })
  }
  
    setNome(evento){        //Pegando informação do input Nome
      this.setState({nome:evento.target.value});
    }
    setEmail(evento){       //Pegando informação do input Email
      this.setState({email:evento.target.value});
    }
    setSenha(evento){       //Pegando informação do input Senha
      this.setState({senha:evento.target.value});
    }
  

    render(){
        return(
        <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
        <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>                                              
        <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>                                              
        <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>                                                   <div className="pure-control-group">                                  
            <label></label>
            <BotaoSubmitCustomizado label="Gravar"/>                                    
        </div>
        </form>        

        </div>  
        );
    }

}

class TableAuthor extends Component{
    render(){
        return(
            <div>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.lista.map(function(autor){
                    return (
                      <tr key={autor.id}>
                        <td>{autor.nome}</td>
                        <td>{autor.email}</td>
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
export default class AuthorBox extends Component{

    constructor() {
        super();
        this.state = {lista : []};
        }
        componentDidMount(){
          $.ajax({
              url:"https://cdc-react.herokuapp.com/api/autores",
              dataType: 'json',
              success:function(resposta){
                this.setState({lista:resposta});
                }.bind(this)
          }
        );
    }

    render(){
        return(
            <div className="content" id="content">
            <FormAuthor />
            <TableAuthor lista={this.state.lista} />
            </div>
        );
    }
}