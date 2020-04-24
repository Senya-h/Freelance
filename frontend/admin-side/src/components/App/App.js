import React, {Component} from 'react';
import './App.css';
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import Skills from "../Skills/Skills";
import Services from "../Services/Services";
import Portfolio from "../Portfolio/Portfolio";
import Users from "../Users/Users";
import Login from "../Login/Login";
import decode from 'jwt-decode';
import{
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink,
    Redirect
} from "react-router-dom";

class App extends Component{
    constructor() {
        super()
    }

checkAuth = () => {
  const login = localStorage.getItem('login')
  if (!login) {
    return false
  } 
  const token = JSON.parse(login).token;
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
    <div className="App">
        <div id="wrapper">
        
        
      <Sidebar isLoggedIn={this.checkAuth}/>
            <Switch>
                <AuthRoute path="/" exact component={Main}/>
                <AuthRoute path="/igudziai" exact component={Skills}/>
                <AuthRoute path="/paslaugos" exact component={Services}/>
                <AuthRoute path="/portfolio" exact component={Portfolio}/>
                <AuthRoute path="/vartotojai" exact component={Users}/>
                <NonAuthRoute path="/login" exact component={Login}/>
            </Switch>
        </div>
    </div>
      </Router>

  );}
}

export default App;
