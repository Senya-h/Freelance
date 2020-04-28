import React, {Component} from 'react';
import './Main.css';
import axios from '../../axios';
import load from '../../img/loading.gif';

class Main extends Component{
    constructor() {
        super()
        this.state = {
            loading: true,
            statistic: []
        }
    }
    componentDidMount() {
        axios.get(`/statistics`)
            .then(data => {
                    this.setState({
                        statistic: data.data,
                        loading: false
                    })
            })
    }
render() {
    if(this.state.loading) {
        return(
            <img className="loading" src={load} alt="loading..." />
        )
    }
    return(
        <div className="Main">
            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h1>Statistika</h1>
                        <div className="stats row">
                            <div className="stat col">
                                <p className="numb">{this.state.statistic.users}</p>
                                <p className="text">Vartotojų</p>
                            </div>
                            <div className="stat col">
                                <p className="numb">{this.state.statistic.banned}</p>
                                <p className="text">Užblokuoti vartotojai</p>
                            </div>
                            <div className="stat col">
                                <p className="numb">{this.state.statistic.thisDayUsers}</p>
                                <p className="text">Šiandien užsiregistravo</p>
                            </div>
                            <div className="stat col">
                                <p className="numb">{this.state.statistic.services}</p>
                                <p className="text">Paslaugų</p>
                            </div>
                            <div className="stat col">
                                <p className="numb">{this.state.statistic.works}</p>
                                <p className="text">Darbų</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Main;