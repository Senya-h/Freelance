import React, {Component} from 'react';
import './Skills.css';
import axios from '../../axios';

class Skills extends Component{
    constructor() {
        super()
        this.state = {
            skills: [],
            skillName: "",
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeskillName = this.handleChangeskillName.bind(this);
    }

    handleChangeskillName(event){
        this.setState({skillName: event.target.value})
    }

    handleSubmit(event){
        if(document.getElementById('exampleInput').value == ""){
            document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Neįvestas joks tekstas</div>"
        }else{
            axios.post("/skill_add", {
                skillName: this.state.skillName
            }).then(res => {
                this.setState({error: res.data})
                console.log(this.state.error)
                if(this.state.error['error']) {
                    if(this.state.error['error']['skillName'] == "The skill name may not be greater than 255 characters.") {
                        document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Įgūdžio pavadinimas per ilgas. Daugiausiai gali būt 255 simboliai!</div>"
                    } else if(this.state.error['error']['skillName'] == "The skill name has already been taken.") {
                        document.querySelector('.error').innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Toks igūdis jau pridėtas</div>"
                    }
                } else {
                    document.querySelector('.error').innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Įgūdis pridėtas</div>"
                }
            })
                .catch(function (error) {
                    console.log(error.response+"LOL");
                });
            
        }
        event.preventDefault();

    }
    componentDidMount(){
        axios.get(`/skills`)
            .then(data => {
                this.setState({
                    skills: data.data
                })
            })
    }

    render(){
    const skillsList = this.state.skills.map(skill => ( 
        <tr key={skill.id}>
        <th scope="row">{skill.id}</th>
        <td>{skill.skillName}</td>
        <td>x</td>
        </tr>
        ));
        console.log(this.state.skills)
        return(
            <main>
                <div className="main">
                    <div className="main-content">
                        <div className="container-fluid">
                            <h1>Įgūdžių pridėjimas</h1>
                            <div className="error"></div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" value={this.state.skillName} onChange={this.handleChangeskillName} className="form-control" id="exampleInput"
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