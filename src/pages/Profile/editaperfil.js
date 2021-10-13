import React, { Component } from "react";
import { Input } from 'semantic-ui-react'
import { Form, Container } from "./styles";
import Menu from '../../components/menu';
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar';
class SignUp extends Component {
  constructor(props) {
    super(props);
  this.state = {
    nome: "",
    cpf: "",
    dt_nascimento: "",
    telefone: "",
    email: "",
    password: "",
    endereco: "",
    numero: "",
    cep: "",
    role: "cliente",
    error: "",
    profileImage: "http://ipet.kinghost.net/imagens/pngwing.com.png",
    selectFile: null,
    iduser: ''
    
  };
  
  
}



Alterar = async () => {
var data = moment(this.state.dt_nascimento);
const idUser = localStorage.getItem('@ipetid');
let formData = new FormData();
formData.append('Id', parseInt(idUser));
formData.append('nome', this.state.nome);
formData.append('data_nascimento', data.format("YYYY-MM-DD"));
formData.append('telefone', this.state.telefone);
formData.append('Image', this.state.selectFile, this.state.selectFile.name);


  if (!this.state.nome || !this.state.dt_nascimento || !this.state.telefone ) {
    this.setState({ error: "Preencha todos os dados para se cadastrar" });
  } else {
    try{
      await fetch('http://www.ipet.kinghost.net/v1/account/AlterarUsuario',{
        method: "POST",       
        body: formData
    })
       
       .then((response) => response.text())
       .then((responseJson) => {
        console.log(responseJson)
         
       }
       )
       .catch((error) => {console.log("erro fetch",error)});
    } catch (err) {
      console.log(err);
      this.setState({ error: "Ocorreu um erro ao editar sua conta. T.T" });
    }
  }
};

  handleImageChange = event =>{
    const file = URL.createObjectURL(event.target.files[0]);
    console.log(event.target.files[0])
    this.setState({
      selectFile: event.target.files[0],
      profileImage: file
    })
  }

  render() {

    return (

    <div style={styles.root}>
        <Menu/>
      <Container style={styles.Container}>       
      <div style={styles.Form}>
          <Input type="file" onChange={this.handleImageChange}/>     
          {this.state.error && <p>{this.state.error}</p>}
          
          <Input icon='users' iconPosition='left' style={styles.Input}
            placeholder="Nome completo."
            onChange={e => this.setState({ nome: e.target.value })}
          />
          <Input icon='calendar' iconPosition='left' style={styles.Input}
            type="dt_nascimento"
            placeholder="Data de Nascimento."
            onChange={e => this.setState({ dt_nascimento: e.target.value })}
          />
          <Input icon='phone' iconPosition='left' style={styles.Input}
            type="tel"
            placeholder="Telefone."
            onChange={e => this.setState({ telefone: e.target.value })}
          />
          <button onClick={this.Alterar} style={styles.button}>Alterar</button>
          
          
          </div>
      <div style={{marginTop: 25, marginBottom: 5}} class="ui action input">
      
      </div>
      </Container>

      </div> 
    );
  }
}
const styles = {
    root: {
        width: '100%',
      },
  container: {
    marginTop: 50,
    display: 'flex',
    justifycontent: 'center',
    
  },
  Input:{
    flex: 1,
    height: 46,
    width: '100%',
    marginTop: '10px'
    
  },
  Button: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '10px',
    fontSize: 16,
  },
  Link: {
    color: '#fff',
  },
  Form: {
    width: '400px',
    background: '#6A5ACD',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
    color: '#fff',
    fontSize: '16px',
    background: '#836FFF',
    height: '56px',
    border: 0,
    borderRadius: '5px',
    width: '100%',
  }
  
};
export default SignUp;
