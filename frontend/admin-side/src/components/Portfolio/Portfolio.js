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
            modalShow:false,
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
    modalOpen = (id, name) => {
        this.setState({
            modalShow:true,
            workID:id,
            modalWorkName: name
    })
    }
    modalClose = () => {
            this.setState({
                modalShow:false
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
            
            this.modalClose();
        }
render() {
    const worksList = this.state.works.map(work => ( 
        <Card key={work.id} className="col-lg-4" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`${baseURL}/storage/${work.filePath}`} />
        <Card.Body>
            <Card.Title>{work.title}</Card.Title>
            <Card.Text>
            Aprašymas: {work.description}
            </Card.Text>
            <div className="row">
                <div className="col-6">
                    <Button className="col-6" variant="success">Patvirtinti</Button>
                </div>
                <div className="col-6">
                    <Button className="col-6" variant="danger" onClick={() => this.modalOpen(work.id, work.title)}>Ištrinti</Button>
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
                                show={this.state.modalShow}
                                onHide={this.modalClose}
                                text={`Ar tikrai norite ištrinti šį darbą? ( ${this.state.modalWorkName} )`}
                                token={this.state.token}
                                btn={"Ištrinti"}
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