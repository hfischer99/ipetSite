import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Input } from 'semantic-ui-react'
import { Avatar } from 'antd';
import { Form, Container } from "./styles";
import Axios from "axios";

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



handleSignUp = async e => {
  let formData = new FormData();
formData.append('nome', this.state.nome);
formData.append('cpf', this.state.cpf);
formData.append('email', this.state.email);
formData.append('telefone', this.state.telefone);
formData.append('tipo_usuario', 2);
formData.append('password', this.state.password);
formData.append('role', this.state.role);
formData.append('Image', this.state.selectFile, this.state.selectFile.name);
  e.preventDefault();
  const { nome,cpf,dt_nascimento,telefone,email, password} = this.state;
  if (!nome || !cpf || !dt_nascimento || !telefone || !email || !password ) {
    this.setState({ error: "Preencha todos os dados para se cadastrar" });
  } else {
    this.fileUpload();
    try{
      await fetch('http://www.ipet.kinghost.net/v1/account/Adicionar',{
        method: "POST",
        
        body: formData
    })
       
       .then((response) => response.json())
       .then((responseJson) => {
        console.log(responseJson)
         
       }
       )
       .catch((error) => {console.log("erro fetch",error)});
 
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
      this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
    }
  }
};


adicionaEndereco = () =>{
  
  {
    
    fetch('http://www.ipet.kinghost.net/v1/account/AdicionarEndereco"',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        "Endereco": this.state.endereco,
        "Numero": this.state.numero,
        "Cep": this.state.cep

    })
  })
  
     
     .then((response) => response.json())
     .then((responseJson) => {
      this.setState({
        iduser: JSON.parse(responseJson)
        } 
      );
       console.log(this.state.iduser.id)
       
     }
     )
     .catch((error) => {console.log("erro fetch",error)});

    
  };
}

  
  handleImageChange = event =>{
    const file = URL.createObjectURL(event.target.files[0]);
    console.log(event.target.files[0])
    this.setState({
      selectFile: event.target.files[0],
      profileImage: file
    })
  }
  fileUpload = ()=>{
    const fd = new FormData();
    fd.append('Image', this.state.selectFile, this.state.selectFile.name);
    Axios.post('http://www.ipet.kinghost.net/v1/account/UploadFile',fd)
    .then(res =>{
      console.log(res);
    })
  }

  render() {

    return (
      <Container style={styles.Container}>
        <Form onSubmit={this.handleSignUp}>
          
       
        <Avatar src={this.state.profileImage}  size="large"/>
        <Input type="file" onChange={this.handleImageChange}/>
        
        
          {this.state.error && <p>{this.state.error}</p>}
          
          <Input icon='users' iconPosition='left' style={styles.Input}
            placeholder="Nome completo."
            onChange={e => this.setState({ nome: e.target.value })}
          />
           <Input icon='users' iconPosition='left' style={styles.Input}
            type="cpf"
            placeholder="CPF."
            onChange={e => this.setState({ cpf: e.target.value })}
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
           <Input icon='mail' iconPosition='left' style={styles.Input}
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
           <Input icon='key' iconPosition='left' style={styles.Input}
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit" style={styles.Button}>Cadastrar grátis</button>
          <hr />
          <Link to="/"style={styles.Link}>Fazer login</Link>
        </Form>
      </Container>
    );
  }
}
const styles = {
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
  }
};
export default withRouter(SignUp);
