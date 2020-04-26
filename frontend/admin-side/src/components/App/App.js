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
import {Form, Button} from 'react-bootstrap';
import{
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink,
    Redirect
} from "react-router-dom";
import axios from '../../axios';

class App extends Component{
    constructor() {
        super()
        this.state = {
          email: "",
          password: "",
          error: ""
      }
      this.handleChangeEmail = this.handleChangeEmail.bind(this)
      this.handleChangePassword = this.handleChangePassword.bind(this)
      this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

  handleChangeEmail(event){
      this.setState({email: event.target.value})
  }
  handleChangePassword(event){
      this.setState({password: event.target.value})
  }
  handleOnSubmit(event) {
      event.preventDefault();
      const values = {
              email: this.state.email,
              password: this.state.password
      }
      axios.post("/login", values
          ).then(data => {
              if(data.data.token && data.data.userRole == 1) {
                  localStorage.setItem('login', 
                  JSON.stringify({
                      token:data.data.token,
                      id: data.data.userID,
                      userRole: data.data.userRole})
                      );
                      console.log("Prisijungta.. Reload page..")
              } else if(data.data.userRole != 1) {
                  document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Neturite teisės čia prisijungti</div>"
              } else {
                  document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"+data.data.error+"</div>"
              }
          })
          
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
                <AuthRoute path="/banned" exact component={BannedUsers}/>
                <NonAuthRoute path="/login" exact>
                  <div className="Login">
                    <div className="main">
                        <div className="main-content">
                            <div className="container-fluid">
                                <h1>Prisijungimas</h1>
                                <div className="loginForm container w-50">
                                    <div className="error"></div>
                                    <Form onSubmit={this.handleOnSubmit}> 
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="El.Paštas" value={this.state.email} onChange={this.handleChangeEmail}/>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Slaptažodis" value={this.state.password} onChange={this.handleChangePassword}/>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Prisiminti mane" />
                                        </Form.Group>
                                        
                                        <button type="submit" value="Submit"  className="btn btn-success">Prisijungti</button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </NonAuthRoute>
            </Switch>
        </div>
    </div>
      </Router>

  );}
}

export default App;
