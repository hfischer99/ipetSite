import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Input } from 'semantic-ui-react'
import { Avatar } from 'antd';
import { Form, Container } from "./styles";
import Axios from "axios";
import Menu from '../../components/menu';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
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
    profileImage: "http://ipet.kinghost.net/imagens/pngwixxxxng.com.png",
    selectFile: null,
    iduser: ''
    
  };
  
  
}



handleSignUp = async e => {
  let formData = new FormData();
formData.append('nome', this.state.nome);
formData.append('cpf', this.state.cpf);
formData.append('email', this.state.cpf);
formData.append('telefone', this.state.telefone);
formData.append('tipo_usuario', 2);
formData.append('password', this.state.password);
formData.append('role', this.state.role);
formData.append('Image', this.state.selectFile, this.state.selectFile.name);
  e.preventDefault();
  const { nome,cpf,dt_nascimento,telefone,email, password, endereco, numero, cep } = this.state;
  if (!nome || !cpf || !dt_nascimento || !telefone || !email || !password || !endereco || !numero || !cep) {
    this.setState({ error: "Preencha todos os dados para se cadastrar" });
  } else {
    try{
      await fetch('http://www.ipet.kinghost.net/v1/account/RetornaDadosCPF',{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "CPF": this.state.cpf,
  
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
        <div style={{width: "100%"}}>
         <Menu/>
        </div>
        
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
