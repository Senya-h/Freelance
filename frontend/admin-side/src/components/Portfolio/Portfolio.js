import React, {Component} from 'react';
import './Portfolio.css';
import axios, {baseURL} from '../../axios';
import {Button, Card} from 'react-bootstrap';
import load from '../../img/loading.gif';
import DeleteModal from '../DeleteModal';
import PortfolioModal from './PortfolioModal';
import {Link} from "react-router-dom";
import ReactPlayer from 'react-player';
import mime from 'mime-types';
import Pagination from "react-js-pagination";

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
            PortfolioModalShow:false,
            workID: "",
            modalWorkName: "",
            imagePath: "",
            description: "",
            format: "",
            activePage: 1,
            itemsCountPerPage: 1,
            total: 1
        }
        this.handlePageChange=this.handlePageChange.bind(this)
    }
    componentDidMount(){
        this._isMounted = true;
        axios.get(`/works`)
            .then(data => {
                if(this._isMounted) {
                    this.setState({
                        works: data.data.data,
                        loading: false,
                        itemsCountPerPage: data.data.per_page,
                        total: data.data.total,
                        loading: false,
                        activePage: data.data.current_page
                    })
                }
            })
    }
    handlePageChange(pageNumber) {
        this.setState({loading: true})
        axios.get(`/works?page=${pageNumber}`, {
            headers: {
                    'Authorization': this.state.token,
                }
        })
            .then(data => {
                    this.setState({
                        works: Object.values(data.data.data),
                        itemsCountPerPage: data.data.per_page,
                        total: data.data.total,
                        loading: false,
                        activePage: data.data.current_page
                    })
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
                        works: data.data.data,
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
    PortfolioModalOpen = (id, name, img, desc) => {
        this.setState({
            PortfolioModalShow:true,
            workID:id,
            modalWorkName: name,
            imagePath: img,
            description: desc
    })
    }
    PortfolioModalClose = () => {
            this.setState({
                PortfolioModalShow:false
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
        fileFormat(img) {
            if(mime.lookup(img)) {
                this.setState({
                    format: mime.lookup(img).split('/')[0]
                })
                console.log(this.state.format)
            }
        }
render() {
    const worksList = this.state.works.map(work => ( 
        <Card key={work.id} className="col-lg-3" style={{ width: '18rem' }}>
            <div className="card-img">
                {
                    mime.lookup(work.filePath).split('/')[0] === "image" ? 
                    (
                        <Card.Img onClick={() => this.PortfolioModalOpen(work.id, work.title, work.filePath, work.description)} variant="top" className="imgMax" src={`${baseURL}/storage/${work.filePath}`} />
                    ) :
                    mime.lookup(work.filePath).split('/')[0] === "video" ? 
                    (
                        <ReactPlayer onClick={() => this.PortfolioModalOpen(work.id, work.title, work.filePath, work.description)} className="imgMax" url={`${baseURL}/storage/${work.filePath}`} />
                    ) 
                    : 
                    (
                        <Card.Img onClick={() => this.PortfolioModalOpen(work.id, work.title, work.filePath, work.description)} variant="top" className="imgMax file" src={`${baseURL}/storage/portfolioWorks/textFile.png`} />
                    )
                }
            </div>
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
                        <Link to="/formats" className="text-muted">Formatų pridėjimas</Link>
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
                            <PortfolioModal
                                title = {this.state.modalWorkName}
                                show={this.state.PortfolioModalShow}
                                onHide={this.PortfolioModalClose}
                                filePath={this.state.imagePath}
                                description={this.state.description}
                            />
                                <div className="row">
                                        {worksList}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.total}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Portfolio;