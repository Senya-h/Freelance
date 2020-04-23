import React, { Component } from 'react';
import './Users.css';
import axios from '../../axios';
import UserDeleteModal from '../DeleteModal';
import {Button} from 'react-bootstrap';

class Users extends Component{
    constructor() {
        super()
        this.state = {
            users: [],
            error: "",
            modalShow:false,
            userID: "",
            modalUserName: "",
            token: 'Bearer '+localStorage.getItem('loginToken')
        }
    }
    componentDidMount(){
        axios.get(`/users`, {
            headers: {
                    'Authorization': this.state.token,
                    'Content-Type': 'multipart/form-data'
                }
        })
            .then(data => {
                console.log(data.data)
                this.setState({
                    users: data.data,
                })
                
            })
    }
    modalOpen = (id, name) => {
        this.setState({
            modalShow:true,
            userID:id,
            modalUserName: name
    })
    }
    modalClose = () => {
            this.setState({
                modalShow:false
            })
        }
render() {
    const usersList = this.state.users.map(user => ( 
        <tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.location}</td>
        <td>{user.created_at}</td>
        <td><Button variant="danger" onClick={() => this.modalOpen(user.id, user.name)}>
            Pašalinti
        </Button></td>
        <td><Button variant="danger">
            Užblokuoti
        </Button></td>
        </tr>
        
        ));
    
    return(
        <div className="Users">
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Vartotojai</h1>
                        <div className="error"></div>
                        <UserDeleteModal
                            method = "post"
                            fetchLink={`user&id=${this.state.userID}/ban/delete`}
                            show={this.state.modalShow}
                            onHide={this.modalClose}
                            text={`Ar tikrai norite ištrinti šį vartotoją? ( ${this.state.modalUserName} )`}
                            token={this.state.token}
                            message = {"Vartotojas ištrintas"}
                        />
                        <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Vardas</th>
                                    <th scope="col">El.Paštas</th>
                                    <th scope="col">Miestas</th>
                                    <th scope="col">Prisiregistravęs</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {usersList}
                                </tbody>
                                </table>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default Users;