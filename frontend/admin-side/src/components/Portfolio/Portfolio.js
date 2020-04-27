import React, {Component} from 'react';
import './Portfolio.css';
import axios, {baseURL} from '../../axios';
import {Button, Card} from 'react-bootstrap';
import load from '../../img/loading.gif';
import DeleteModal from '../DeleteModal';

class Portfolio extends Component{
    _isMounted = false
    constructor() {
        super()
        this.state = {
            works: [],
            token: 'Bearer '+JSON.parse(localStorage.getItem('login')).token, 
            loading: true,
            refetch: false,
            deleteModalShow:false,
            approveModalShow:false,
            workID: "",
            modalWorkName: "",
        }
    }
    componentDidMount(){
        this._isMounted = true;
        axios.get(`/works`)
            .then(data => {
                if(this._isMounted) {
                    this.setState({
                        works: data.data,
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
            axios.get(`/works`)
                .then(data => {
                    this.setState({
                        works: data.data,
                        loading: false,
                        refetch: false
                    })
                    
                })
        }
    }
    deleteModalOpen = (id, name) => {
        this.setState({
            deleteModalShow:true,
            workID:id,
            modalWorkName: name
    })
    }
    deleteModalClose = () => {
            this.setState({
                deleteModalShow:false
            })
        }
    approveModalOpen = (id, name) => {
        this.setState({
            approveModalShow:true,
            workID:id,
            modalWorkName: name
    })
    }
    approveModalClose = () => {
            this.setState({
                approveModalShow:false
            })
    }
    
        delete = (id) => {
            axios.delete(`admin/delete/work&id=${this.state.workID}`, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'multipart/form-data'
                    }
            }).then(res => {
                document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Portfolio darbas ištrintas</div>"
                this.setState({refetch:true})
            }
            )
            
            this.deleteModalClose();
        }
        approve = (id) => {
            axios.post(`/work&id=${this.state.workID}/approve`, {approved:1}, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'application/json',
                    }
            }).then(res => {
                console.log(res)
                document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Portfolio darbas patvirtintas</div>"
                this.setState({refetch:true})
            }
            ).catch(error => {
                console.log(error.response)
            })
            
            this.approveModalClose();
        }
render() {
    const worksList = this.state.works.map(work => ( 
        <Card key={work.id} className="col-lg-4" style={{ width: '18rem' }}>
        <Card.Img variant="top" className="imgMax" src={`${baseURL}/storage/${work.filePath}`} />
        <Card.Body>
            <Card.Title>{work.title}</Card.Title>
            <Card.Text>
            Aprašymas: {work.description}
            </Card.Text>
            <div className="row">
                { work.approved === 0 ? (
                <div className="col-6">
                    <Button variant="success" onClick={() => this.approveModalOpen(work.id, work.title)}>Patvirtinti</Button>
                </div> ) : (
                <div className="col-6">
                    <Button variant="secondary" disabled>Patvirtintas</Button>
                </div> 
                )}
                <div className="col-6">
                    <Button variant="danger" onClick={() => this.deleteModalOpen(work.id, work.title)}>Ištrinti</Button>
                </div>
            </div>
            <br/><span className="text-muted">Autorius: {work.name}</span>
        </Card.Body>
        </Card>
        
        ));
    if(this.state.loading) {
        return(
            <img className="loading" src={load} alt="loading..." />
        )
    }
    return(
        <div className="Portfolio">
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Portfolio Darbai</h1>
                        <div className="error"></div>
                            <DeleteModal
                                method = {() => this.delete(this.state.workID)}
                                show={this.state.deleteModalShow}
                                onHide={this.deleteModalClose}
                                text={`Ar tikrai norite ištrinti šį darbą? ( ${this.state.modalWorkName} )`}
                                token={this.state.token}
                                btn={"Ištrinti"}
                            />
                            <DeleteModal
                                method = {() => this.approve(this.state.workID)}
                                show={this.state.approveModalShow}
                                onHide={this.approveModalClose}
                                text={`Ar tikrai norite patvirtinti šį darbą? ( ${this.state.modalWorkName} )`}
                                token={this.state.token}
                                btn={"Patvirtinti"}
                            />
                        <div className="row">
                            {worksList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Portfolio;