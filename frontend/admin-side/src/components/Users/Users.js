import React, { Component } from 'react';
import './Users.css';
import axios from '../../axios';
import UserDeleteModal from '../UserDeleteModal';
import {Button} from 'react-bootstrap';
import load from '../../img/loading.gif';

class Users extends Component{
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            users: [],
            error: "",
            modalShow:false,
            userID: "",
            modalUserName: "",
            token: 'Bearer '+JSON.parse(localStorage.getItem('login')).token,
            loading: true
        }
    }
    componentDidMount(){
        this._isMounted = true;
        axios.get(`/users`, {
            headers: {
                    'Authorization': this.state.token,
                }
        })
            .then(data => {
                if(this._isMounted) {
                    this.setState({
                        users: data.data,
                        loading: false
                    })
                }
            })
    }
    componentWillUnmount() {
        this._isMounted = false;
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
    delete = () => {
            axios.post(`/user&id=${this.state.userID}/ban/delete`, {deleted: 1, baned: 0}, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'application/json',
                    }
            })
            .then(data => {
                console.log(data)
                document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Ištrintas</div>"
            }).catch(error => {
                console.log(error.response)
          })
            this.modalClose()
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
    
        if(this.state.loading) {
            return(
                <img className="loading" src={load} alt="loading..." />
            )
        }
    
    return(
        <div className="Users">
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Vartotojai</h1>
                        <div className="error"></div>
                        <UserDeleteModal
                            delete={()=>this.delete()}
                            userID={this.state.userID}
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