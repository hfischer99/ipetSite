import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Input } from 'semantic-ui-react'
import Logo from "../../assets/pngwing.com.png";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Form, Container } from "./styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    info: [],
    checkedA: false,
    checkedB: false,
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.checked });
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/v1/account/login", { email, password });
        this.setState({info: response.data})
        login(response.data.token);
        console.log(response.data)
        localStorage.removeItem('@petid');
        localStorage.removeItem('@ipetidempresa');
        localStorage.removeItem('@ipetnome');
        localStorage.setItem('@ipettoken', response.data.token)
        localStorage.setItem('@ipetid', response.data.user.id)
        localStorage.setItem('@ipetidempresa', response.data.user.id_empresa)
        localStorage.setItem('@ipetnome', response.data.user.nome)

        if(response.data.user.role == "manager" && this.state.checkedA == true){
          this.props.history.push({
            pathname: '/admin',
            state: this.state.info
          });
        } else if (response.data.user.role == "veterinario" && this.state.checkedA == true){
          this.props.history.push({
            pathname: '/veterinario',
            state: this.state.info
          });
        } 
        
        else {
          this.props.history.push({
            pathname: '/app',
            state: this.state.info
          });
        }

      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  render() {
    return (
      <Container style={styles.Container}>

        <Form onSubmit={this.handleSignIn}>

          <img src={Logo} alt="IpetLogo" />
          {this.state.error && <p>{this.state.error}</p>}
          <Input icon='users' iconPosition='left' style={styles.Input}
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input icon='key' iconPosition='left' style={styles.Input}
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <FormControlLabel
          control={<Switch checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
          label="Logar como administrador."
          swi
          />
          <button type="submit" style={styles.Button}>Entrar</button>
          <hr />
          <Link to="/signup" style={styles.Link}>Criar conta grátis</Link>
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
    marginTop: '10px',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '10px',
    fontSize: 16,
  },
  Link: {
    color: '#fff',
  }
};
export default withRouter(SignIn);
