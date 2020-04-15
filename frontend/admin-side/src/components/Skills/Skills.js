import React, {Component} from 'react';
import './Skills.css';

class Skills extends Component{
    constructor() {
        super()
        this.state = {
            test: []
        };
    }
    componentDidMount(){
        fetch("http://skelbimai.test/api/")
            .then(res => res.json())
            .then(data =>{
                this.setState({
                    test:data
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
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
export default Skills;