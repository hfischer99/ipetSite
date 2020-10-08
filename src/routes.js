import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import AddEndereco from "./pages/Profile/addendereco";
import Info from "./pages/Info/index";
import Checkout from "./pages/Checkout/index";
import Endereco from "./pages/Profile/endereco";
import Pet from "./pages/Profile/pet";
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
      <PrivateRoute path="/app" component={Pet} />
      <PrivateRoute path="/endereco" component={Endereco} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
