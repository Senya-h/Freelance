import React, {Component} from 'react';
import './Services.css';
import axios from '../../axios';
import {Button} from 'react-bootstrap';
import load from '../../img/loading.gif';
import DeleteModal from '../DeleteModal';

class Services extends Component{
    _isMounted = false
    constructor() {
        super()
        this.state = {
            services: [],
            token: 'Bearer '+JSON.parse(localStorage.getItem('login')).token, 
            loading: true,
            refetch: false,
            modalShow:false,
            serviceID: "",
            modalServiceName: "",
        }
    }
    componentDidMount(){
        this._isMounted = true;
        axios.get(`/services`)
            .then(data => {
                if(this._isMounted) {
                    this.setState({
                        services: data.data,
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
            axios.get(`/services`)
                .then(data => {
                    this.setState({
                        services: data.data,
                        loading: false,
                        refetch: false
                    })
                    
                })
        }
    }
    modalOpen = (id, name) => {
        this.setState({
            modalShow:true,
            serviceID:id,
            modalServiceName: name
    })
    }
    modalClose = () => {
            this.setState({
                modalShow:false
            })
        }
    
        delete = (id) => {
            axios.delete(`admin/delete/service&id=${this.state.serviceID}`, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'multipart/form-data'
                    }
            }).then(res => {
                document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Paslauga ištrinta</div>"
                this.setState({refetch:true})
            }
            )
            
            this.modalClose();
        }
render() {
    const servicesList = this.state.services.map(service => ( 
        <tr key={service.id}>
        <th scope="row">{service.id}</th>
        <td>{service.service}</td>
        <td>{service.description}</td>
        <td>{service.price_per_hour}€/val</td>
        <td>{service.name}</td>
        <td><Button variant="danger" onClick={() => this.modalOpen(service.id, service.service)}>
            Pašalinti
        </Button></td>
        </tr>
        
        ));
    if(this.state.loading) {
        return(
            <img className="loading" src={load} alt="loading..." />
        )
    }
    return(
    <div className="Ads">
        <div className="main">
            <div className="main-content">
                <div className="container-fluid">
                    <h1>Visos paslaugos</h1>
                    <div className="error"></div>
                    <DeleteModal
                        method = {() => this.delete(this.state.serviceID)}
                        show={this.state.modalShow}
                        onHide={this.modalClose}
                        text={`Ar tikrai norite ištrinti šią paslaugą? ( ${this.state.modalServiceName} )`}
                        token={this.state.token}
                        btn={"Ištrinti"}
                    />
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Paslauga</th>
                            <th scope="col">Aprašymas</th>
                            <th scope="col">Kaina už valandą</th>
                            <th scope="col">Paslaugos teikėjas</th>
                            <th scope="col">Šalinti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicesList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )  
    }
    
}

export default Services;