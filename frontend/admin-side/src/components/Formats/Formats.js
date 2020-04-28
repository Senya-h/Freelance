import React, { Component } from 'react';
import './Formats.scss';
import axios from '../../axios';
import DeleteModal from '../DeleteModal';
import {Button} from 'react-bootstrap';
import load from '../../img/loading.gif';

class Skills extends Component{
    _isMounted = false
    constructor() {
        super()
        this.state = {
            formats: [],
            formatName: "",
            modalShow:false,
            error: "",
            formatID: "",
            modalformatName: "",
            token: 'Bearer '+JSON.parse(localStorage.getItem('login')).token, 
            loading: true,
            refetch: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormatName = this.handleFormatName.bind(this);
    }
    handleFormatName(event){
        this.setState({formatName: event.target.value})
    }

    componentDidMount(){
        this._isMounted = true;
        axios.get(`/format-list`)
            .then(data => {
                if(this._isMounted) {
                    this.setState({
                        formats: data.data,
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
            axios.get(`/format-list`)
                .then(data => {
                    this.setState({
                        formats: data.data,
                        loading: false,
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
            axios.post("/format", {format: this.state.formatName}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token,
                }}
            ).then(res => {
                this.setState({error: res.data})
                console.log(res)
                if(this.state.error['error']) {
                    if(this.state.error['error']['format'] == "The format may not be greater than 255 characters.") {
                        document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Formato pavadinimas per ilgas. Daugiausiai gali būt 255 simboliai!</div>"
                    } else if(this.state.error['error']['format'] == "The format has already been taken.") {
                        document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Toks formatas jau pridėtas</div>"
                    }
                } else {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Formatas pridėtas</div>"
                    this.mainInput.value = "";
                    this.setState({refetch: true});
                }
            }).catch(error => {
                console.log(error.response)
          })
            
        }

    }
    
    modalOpen = (id, name) => {
        this.setState({
            modalShow:true,
            formatID:id,
            modalformatName: name
    })
    }
    modalClose = () => {
            this.setState({
                modalShow:false
            })
        }
    
        delete = (id) => {
            axios.delete(`/format/delete/${this.state.formatID}`, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'multipart/form-data'
                    }
            }).then(res => {
                document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Formatas ištrintas</div>"
                this.setState({refetch:true,
                                loading: true})
            }
            )
            
            this.modalClose();
        }

    render(){
        
    
    const formatsList = this.state.formats.map(format => ( 
        <tr key={format.id}>
        <th scope="row">{format.id}</th>
        <td>{format.format}</td>
        <td><Button variant="danger" onClick={() => this.modalOpen(format.id, format.format)}>
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
            <main>
                
                <DeleteModal
                    method = {() => this.delete(this.state.formatID)}
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                    text={`Ar tikrai norite ištrinti šį formatą? ( ${this.state.modalformatName} )`}
                    token={this.state.token}
                    btn={"Ištrinti"}
                />
                <div className="main">
                    <div className="main-content">
                        <div className="container-fluid">
                            <h1>Portfolio darbų failų formatų pridėjimas</h1>
                            <div className="error"></div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input ref={(ref) => this.mainInput= ref} type="text" value={this.state.formatName} onChange={this.handleFormatName} className="form-control" id="exampleInput"
                                           placeholder="Įveskite pavadinimą"></input>
                                </div>
                                <button type="submit" value="Submit"  className="btn btn-success">Pateikti</button>
                            </form>
                            <hr/>
                            
                            <h3>Visi formatai:</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Įgūdis</th>
                                    <th scope="col">Šalinti</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {formatsList}
                                </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </main>
        )
        
    }
}
export default Skills;