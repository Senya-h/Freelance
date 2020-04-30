import React, {Component} from 'react';
import axios from '../../axios';
import load from '../../img/loading.gif';
import {Form, Button, Col, Row} from 'react-bootstrap';
import {
    Link
} from "react-router-dom";

class GiveRole extends Component{
    _isMounted = false
    constructor() {
        super()
        this.state = {
            roles: [],
            role: '',
            userEmail: '',
            loading: false,
            token: 'Bearer '+JSON.parse(localStorage.getItem('login')).token, 
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangeUserEmail = this.handleChangeUserEmail.bind(this);
    }
    
    handleChangeRole(event){
        this.setState({role: event.target.value})
    }
    handleChangeUserEmail(event){
        this.setState({userEmail: event.target.value})
    }
    componentDidMount(){
        this._isMounted = true;
        axios.get(`/role`)
            .then(data => {
                if(this._isMounted) {
                    this.setState({
                        roles: data.data,
                        loading: false
                    })
                }
            })
    }
    handleSubmit(event) {
        event.preventDefault();
        if(document.querySelector('.email').value === "" || document.querySelector('.role').value === "") {
            document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Būtina užpildyti visus laukelius</div>"
        } else {
            axios.post(`/add/role&id=${this.state.role}`, {email: this.state.userEmail}, {
                headers: {
                    'Authorization': this.state.token,
                    'Content-Type': 'application/json',
                }}
            ).then(res => {
                console.log(res.data)
                if(res.data.error) {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"+res.data.error+"</div>"
                } else {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Vartotojui su el.paštu "+this.state.userEmail+" rolė suteikta</div>"
                }
                }).catch(error => {
                console.log(error.response)
            })
        }
    }
    
render() {
    const options = this.state.roles.map(role => ( 
            <option key={role.id} value={role.id}>{role.role}</option>
        ));
    if(this.state.loading) {
        return(
            <img className="loading" src={load} alt="loading..." />
        )
    }
    return(
        <div className="GiveRole">
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Duoti rolę</h1>
                        <Link to="/remove-role">Atimti rolę</Link>
                        <div className="error"></div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Vartotojo el.pašto adresas</Form.Label>
                                <Form.Control type="email" className="email" placeholder="vardas@pavyzdys.lt" onChange={this.handleChangeUserEmail} value={this.state.userEmail}/>
                            </Form.Group>

                                <Form.Label as="legend">
                                        Rolė
                                </Form.Label>
                                <Form.Control as="select" className="role" multiple onChange={this.handleChangeRole}>
                                {options}
                                </Form.Control>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default GiveRole;