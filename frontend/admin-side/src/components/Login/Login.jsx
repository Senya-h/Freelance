import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import './login.scss';
import axios from '../../axios';

class Login extends Component{
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
                console.log(data)
                if(data.data.token) {
                    localStorage.setItem('login', 
                    JSON.stringify({
                        token:data.data.token,
                        id: data.data.userID})
                        );
                } else {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"+data.data.error+"</div>"
                }
            })
            
    }
    render() {
        
    return(
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
    )}
}

export default Login;