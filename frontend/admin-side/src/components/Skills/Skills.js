import React, {Component} from 'react';
import './Skills.css';
import axios from 'axios';

class Skills extends Component{
    constructor() {
        super()
        this.state = {
            skillName: []
        };
    }
    componentDidMount(){
        axios.get("http://skelbimai.test/api/skill_add")
            .then(res => res.json())
            .then(data =>{
                this.setState({
                    skillName:data
                })
            })
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
                                    <label htmlFor="exampleInput">Vardas</label>
                                    <input type="text" className="form-control" id="exampleInput"
                                           aria-describedby="emailHelp" placeholder="Enter email"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInput">Pavardė</label>
                                    <input type="text" className="form-control" id="exampleInput"
                                           placeholder="Password"></input>
                                </div>
                                <button type="submit" className="btn btn-primary">Pateikti</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
export default Skills;