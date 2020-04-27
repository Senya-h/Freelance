import React, {Component} from 'react';
import './App.css';
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import Skills from "../Skills/Skills";
import Services from "../Services/Services";
import Portfolio from "../Portfolio/Portfolio";
import Users from "../Users/Users";
import BannedUsers from "../Users/BannedUsers";
import Login from "../Login/Login";
import decode from 'jwt-decode';
import{
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import {AuthContext} from '../../context/auth';

class App extends Component{
    constructor(props, context) {
        super(props, context);
        this.auth = localStorage.getItem('login');

        this.state = {
          email: "",
          password: "",
          error: "",
          authData: this.auth? JSON.parse(this.auth): undefined,
      }

    }

    setTokens = (data) => {
      localStorage.setItem('login', JSON.stringify(data));
      this.setState({authData: data});
    }

    removeTokens = () => {
      localStorage.removeItem('login');
      this.setState({authData: undefined});
    }

checkAuth = () => {
  if (!this.state.authData) {
    return false
  } 
  const token = this.state.authData.token;
  if(!token) {
    return false;
  }
  try {
    if(decode(token)) {
      return true
    }
  } catch (e) {
    return false
  }
}


render() {
  const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    this.checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
  )} />
)
const NonAuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    this.checkAuth() ? (
        <Redirect to={{ pathname: '/' }} />
    ) : (
        <Component {...props} />
      )
  )} />
)
  return (
      <Router>
        <AuthContext.Provider value={{authData: this.state.authData, setAuthData: this.setTokens, removeAuthData: this.removeTokens}}>
        <div className="App">
          <div id="wrapper">   
            <Sidebar isLoggedIn={this.checkAuth}/>
            <Switch>
                <AuthRoute path="/" exact component={Main}/>
                <AuthRoute path="/igudziai" exact component={Skills}/>
                <AuthRoute path="/paslaugos" exact component={Services}/>
                <AuthRoute path="/portfolio" exact component={Portfolio}/>
                <AuthRoute path="/vartotojai" exact component={Users}/>
                <AuthRoute path="/banned" exact component={BannedUsers}/>
                <NonAuthRoute path="/login" exact component={Login} />
            </Switch>
          </div>
        </div>
        </AuthContext.Provider>
      </Router>

  );}
}

export default App;
