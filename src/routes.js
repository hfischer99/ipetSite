import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Info from "./pages/Info/index";
import Checkout from "./pages/Checkout/index";
import Endereco from "./pages/Profile/endereco";
import Pet from "./pages/Profile/pet";
import Perfil from "./pages/Profile/editaperfil";
import Solicitacoes from "./pages/Solicitacao/index";
import Solicitacao from "../src/admin/pages/Solicitacoes/solicitacoes";
import Funcionario from "../src/admin/pages/Funcionario/index";
import FormaPagamento from "../src/admin/pages/FormaPagamento/index";
import CadastraServicos from "../src/admin/pages/Servicos/index";
import Dash from "../src/admin/pages/Dash/index";
import Servicos from "../src/admin/pages/Servicos/lista";
import Veterinario from "../src/admin/pages/Veterinario/index";
import Agendamento from "../src/pages/Agendamento/index";
import SolicitaTeste from "../src/admin/pages/Solicitacoes/solicitacoes";
import ConsultaVet from "../src/admin/pages/Veterinario/consulta";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/checkout" component={Checkout} />
      <PrivateRoute path="/info" component={Info} />
      <PrivateRoute path="/app" component={Home} />
      <PrivateRoute path="/perfil" component={Perfil} />
      <PrivateRoute path="/pet" component={Pet} />
      <PrivateRoute path="/endereco" component={Endereco} />
      <PrivateRoute path="/cadastroservico" component={CadastraServicos} />
      <PrivateRoute path="/cadastrofuncionario" component={Funcionario} />
      <PrivateRoute path="/formapagamento" component={FormaPagamento} />
      <PrivateRoute path="/solicitacoes" component={SolicitaTeste} />
      <PrivateRoute path="/admin" component={Dash} />
      <PrivateRoute path="/listaservicos" component={Servicos} />     
      <PrivateRoute path="/solicitacao" component={Solicitacoes} />
      <PrivateRoute path="/agendamento" component={Agendamento} />
      <PrivateRoute path="/consulta" component={ConsultaVet} />
      <PrivateRoute path="/veterinario" component={Veterinario} />
      

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
