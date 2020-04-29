import React, { Component } from 'react';
import axios, {baseURL} from '../../axios';
import DeleteModal from '../DeleteModal';
import './RemoveRole.scss'
import {Button} from 'react-bootstrap';
import load from '../../img/loading.gif';

class RemoveRole extends Component{
    constructor() {
        super()
        this.state = {
            roles: [],
            email: "",
            modalShow:false,
            roleID: "",
            modalRole: "",
            token: 'Bearer '+JSON.parse(localStorage.getItem('login')).token, 
            loading: false,
            refetch: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }
    handleChangeEmail(event){
        this.setState({email: event.target.value})
    }
    componentDidUpdate(prevProps){
        if(this.state.refetch == true) {
            axios.post("/user/roles", {email: this.state.email}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token,
                }}
            ).then(res => {
                console.log(this.state.refetch)
                this.setState({
                    roles: res.data[0],
                    refetch: false
                })
            })
        }
    }

    handleSubmit(event){
        event.preventDefault();
        if(document.getElementById('exampleInput').value == ""){
            document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Neįvestas joks tekstas</div>"
        }else{
            axios.post("/user/roles", {email: this.state.email}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token,
                }}
            ).then(res => {
                console.log(res)
                this.setState({
                    roles: res.data[0],
                    refetch: false
                })
            }).catch(error => {
                console.log(error.response)
          })
            
        }

    }
    
    modalOpen = (id, name) => {
        this.setState({
            modalShow:true,
            roleID:id,
            modalRole: name
    })
    }
    modalClose = () => {
            this.setState({
                modalShow:false
            })
        }
        remRole = (id) => {
            axios.delete(`delete/role&id=${id}/user&id=${this.state.roles.id}`, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'multipart/form-data'
                    }
            }).then(res => {
                console.log(res.data)
                if(res.data.error) {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"+res.data.error+"</div>"
                } else {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Rolė atimta</div>"
                    this.setState({
                        refetch: true
                    })
                }
            }
            )
            
            this.modalClose();
        }

    render(){
        
    let results = "";
    let userInfo = "";
    if(this.state.roles.roles !== undefined) {
        console.log(this.state.roles.roles)
        userInfo = (
            <div className="user-info">
                <img className="usrLogo" src={`${baseURL}/storage/${this.state.roles.foto}`} alt="logo"/>
                <p>{this.state.roles.name}</p>
                <p>{this.state.roles.email}</p>
            </div>
        );
       results = this.state.roles.roles.map(role => ( 
                <div key={role.role_id} className="mt-2" id="role-user">
                     <Button variant="danger" onClick={() => this.modalOpen(role.role_id, role.role)}>Nuimti {role.role} rolę</Button>
                </div>
        ));
    }
        if(this.state.loading) {
            return(
                <img className="loading" src={load} alt="loading..." />
            )
        }
        return(
            <main>
                
                <DeleteModal
                    method = {() => this.remRole(this.state.roleID)}
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                    text={`Ar tikrai norite atimti šią rolę? ( ${this.state.modalRole} )`}
                    token={this.state.token}
                    btn={"Atimti"}
                />
                <div className="main">
                    <div className="main-content">
                        <div className="container-fluid">
                            <h1>Atimti rolę</h1>
                            <div className="error"></div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input ref={(ref) => this.mainInput= ref} type="text" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" id="exampleInput"
                                           placeholder="vardas@pavyzdys.lt"></input>
                                </div>
                                <button type="submit" value="Submit"  className="btn btn-success">Ieškoti</button>
                            </form>
                            <hr/>
                            
                            
                            <h3>{this.state.roles.name}</h3>
                            <div className="d-flex justify-content-center">
                                <div className="row w-75">
                                    <div className="col-md-6">
                                        {userInfo}
                                    </div>
                                    <div className="col-md-6">
                                        {results}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
        
    }
}
export default RemoveRole;