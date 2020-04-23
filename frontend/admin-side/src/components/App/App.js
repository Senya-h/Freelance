import React, {Component} from 'react';
import './App.css';
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import Skills from "../Skills/Skills";
import Services from "../Services/Services";
import Portfolio from "../Portfolio/Portfolio";
import Users from "../Users/Users";
import Login from "../Login/Login";
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
  const token = localStorage.getItem('loginToken');
  if(!token) {
    return false;
  }
  return true;
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
        
        
      <Sidebar/>
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
