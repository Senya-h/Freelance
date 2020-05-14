import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import './login.scss';
import axios from '../../axios';

import { useAuth } from '../../context/auth';
const Login = (props) => {
    const {authData, setAuthData} = useAuth();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        error: ''
    });

    const handleChangeEmail = (event) => {
        setLoginInfo({...loginInfo, email: event.target.value})
    }
    const handleChangePassword = (event) => {
        setLoginInfo({...loginInfo, password: event.target.value})
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = {
                email: loginInfo.email,
                password: loginInfo.password
        }
        axios.post("/login/admin", values
            ).then(data => {
                console.log(data)
                if(data.data.token) {
                    setAuthData(data.data);
                    props.history.push('/');
                } else {
                    console.log("401")
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"+data.data.error+"</div>"
                }
            }).catch(error => {
                console.log(error.response.status)
                if(error.response.status === 401) {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Čia prisijungti neturite teisės</div>"
                }
            })
            
    }
        
    return(
        <div className="Login">
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Prisijungimas</h1>
                        <div className="loginForm container w-50">
                            <div className="error"></div>
                            <Form onSubmit={handleOnSubmit}> 
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="El.Paštas" value={loginInfo.email} onChange={handleChangeEmail}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Slaptažodis" value={loginInfo.password} onChange={handleChangePassword}/>
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
    )
}

export default Login;