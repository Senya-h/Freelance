import React, {Component} from 'react';
import './Users.css';
import {Link} from "react-router-dom";
import axios from '../../axios';
import {Button} from 'react-bootstrap';
import load from '../../img/loading.gif';
import DeleteModal from '../DeleteModal';


class BannedUsers extends Component{
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            users: [],
            loading: true,
            token: 'Bearer '+JSON.parse(localStorage.getItem('login')).token,
            modalShow:false,
            userID: "",
            modalUserName: "",
            refetch: false,
        }
    }
    componentDidMount(){
        this._isMounted = true;
        axios.get(`/banned`, {
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
    componentDidUpdate(prevProps){
        if(this.state.refetch == true) {
            axios.get(`/banned`, {
                headers: {
                        'Authorization': this.state.token,
                    }
            })
                .then(data => {
                    this.setState({
                        users: data.data,
                        loading: false,
                        refetch: false
                    })
                    
                })
        }
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
    
        delete = (id) => {
            axios.delete(`user&id=${this.state.userID}/remove`, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'multipart/form-data'
                    }
            }).then(res => {
                document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Vartotojas atblokuotas</div>"
                this.setState({refetch:true})
            }
            )
            
            this.modalClose();
        }
render() {
    const usersList = this.state.users.map(user => ( 
        <tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.location}</td>
        <td>{user.created_at}</td>
        <td><Button variant="success" onClick={() => this.modalOpen(user.id, user.name)}>
            Atblokuoti
        </Button></td>
        </tr>
        
        ));
    
        if(this.state.loading) {
            return(
                <img className="loading" src={load} alt="loading..." />
            )
        }
    return(
        <div className="banned">
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Užblokuoti vartotojai</h1>
                        <Link to="/vartotojai" className="text-muted">Visi</Link>
                        <div className="error"></div>
                            <DeleteModal
                                method = {() => this.delete(this.state.userID)}
                                show={this.state.modalShow}
                                onHide={this.modalClose}
                                text={`Ar tikrai norite atblokuoti šį vartotoją? ( ${this.state.modalUserName} )`}
                                token={this.state.token}
                                btn={"Atblokuoti"}
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
    )
}
}

export default BannedUsers;