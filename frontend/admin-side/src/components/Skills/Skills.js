import React, { Component } from 'react';
import './Skills.css';
import axios from '../../axios';
import DeleteModal from '../DeleteModal';
import {Button} from 'react-bootstrap';
import load from '../../img/loading.gif';

class Skills extends Component{
    constructor() {
        super()
        this.state = {
            skills: [],
            skillName: "",
            error: "",
            modalShow:false,
            skillID: "",
            modalSkillName: "",
            token: 'Bearer '+localStorage.getItem('loginToken'), 
            loading: true,
            refetch: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeskillName = this.handleChangeskillName.bind(this);
    }

    handleChangeskillName(event){
        this.setState({skillName: event.target.value})
    }

    componentDidMount(){
        axios.get(`/skills`, {
            headers: {
                    'Authorization': this.state.token,
                    'Content-Type': 'multipart/form-data'
                }
        })
            .then(data => {
                console.log(data.data)
                this.setState({
                    skills: data.data,
                    loading: false
                })
                
            })
    }
    componentDidUpdate(prevProps){
        if(this.state.refetch == true) {
            axios.get(`/skills`, {
                headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'multipart/form-data'
                    }
            })
                .then(data => {
                    this.setState({
                        skills: data.data,
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
            axios.post("/skill_add", {
                headers: {
                    'Authorization': this.state.token,
                    'Content-Type': 'multipart/form-data'
                }, skillName: this.state.skillName
            }).then(res => {
                console.log(res.data)
                this.setState({error: res.data})
                if(this.state.error['error']) {
                    if(this.state.error['error']['skillName'] == "The skill name may not be greater than 255 characters.") {
                        document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Įgūdžio pavadinimas per ilgas. Daugiausiai gali būt 255 simboliai!</div>"
                    } else if(this.state.error['error']['skillName'] == "The skill name has already been taken.") {
                        document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Toks igūdis jau pridėtas</div>"
                    }
                } else {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Įgūdis pridėtas</div>"
                    this.mainInput.value = "";
                    this.setState({refetch: true});
                }
            })
            
        }

    }

    
    modalOpen = (id, name) => {
        this.setState({
            modalShow:true,
            skillID:id,
            modalSkillName: name
    })
    }
    modalClose = () => {
            this.setState({
                modalShow:false
            })
        }
    

    render(){
        
    
    const skillsList = this.state.skills.map(skill => ( 
        <tr key={skill.id}>
        <th scope="row">{skill.id}</th>
        <td>{skill.skillName}</td>
        <td><Button variant="danger" onClick={() => this.modalOpen(skill.id, skill.skillName)}>
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
                    method = "delete"
                    fetchLink={`/skill/delete/${this.state.skillID}`}
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                    text={`Ar tikrai norite ištrinti šį įgūdį? ( ${this.state.modalSkillName} )`}
                    token={this.state.token}
                    message = {"Įgūdis ištrintas"}
                />
                <div className="main">
                    <div className="main-content">
                        <div className="container-fluid">
                            <h1>Įgūdžių pridėjimas</h1>
                            <div className="error"></div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input ref={(ref) => this.mainInput= ref} type="text" value={this.state.skillName} onChange={this.handleChangeskillName} className="form-control" id="exampleInput"
                                           placeholder="Įveskite pavadinimą"></input>
                                </div>
                                <button type="submit" value="Submit"  className="btn btn-success">Pateikti</button>
                            </form>
                            <hr/>
                            
                            <h3>Visi Įgūdžiai:</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Įgūdis</th>
                                    <th scope="col">Šalinti</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {skillsList}
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