import React, {Component} from 'react';
import './Skills.css';
import axios from '../../axios';

class Skills extends Component{
    constructor() {
        super()
        this.state = {
            skillName: []
        }
        this.handleChangeskillName = this.handleChangeskillName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeskillName(event){
        this.setState({skillName: event.target.value})
    }

    handleSubmit(event){
        this.setState({skillName: event.target.value})
        event.preventDefault();
    }

    componentDidMount() {
        axios.post("/skill_add", {body: JSON.stringify({skillName: 'React POST Request Example'})}
        )
        .then(res => res.json())
    }
    render(){
        return(
            <main>
                <div className="main">
                    <div className="main-content">
                        <div className="container-fluid">
                            <h1>Įgūdžių pridėjimas</h1>
                            <form>
                                <div className="form-group">
                                    <input type="text" value={this.state.SkillName} onChange={this.handleChangeskillName} className="form-control" id="exampleInput"
                                           placeholder="Įveskite pavadinimą"></input>
                                </div>
                                <button type="submit" value="Submit"  className="btn btn-primary">Pateikti</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
export default Skills;