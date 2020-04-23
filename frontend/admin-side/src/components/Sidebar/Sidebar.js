import React, {Component} from 'react';
import './Sidebar.css';
import {NavLink} from "react-router-dom";

class Sidebar extends Component{
    logout = () => {
        localStorage.removeItem('loginToken')
    }
    isLoggedIn = () => {
        const token = localStorage.getItem('loginToken');
        if(!token) {
            return false;
        }
        return true;
    }
    render() {
    if(this.isLoggedIn) {
        return(
        <div className="Sidebar">
            <div id="sidebar-nav" className="sidebar">
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li><NavLink to="/" className="nav-link"><i className="fa fa-home"></i>
                                <span>Pagrindinis</span></NavLink></li>
                            <li><NavLink to="/igudziai" className="nav-link"><i className="fa fa-code"></i>
                                <span>Įgūdžių pridėjimas</span></NavLink></li>
                            <li><NavLink to="/paslaugos" className="nav-link"><i className="fa fa-chart-bars"></i>
                                <span>Visos paslaugos</span></NavLink></li>
                            <li><NavLink to="/portfolio" className="nav-link"><i className="fa fa-briefcase"></i>
                                <span>Portfolio</span></NavLink></li>
                            <li><NavLink to="/vartotojai" className="nav-link"><i className="fa fa-users"></i>
                                <span>Vartotojai</span></NavLink></li>
                            <li><NavLink to="/login" className="nav-link" onClick={this.logout}><span>Atsijungti</span></NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
     </div>
    )
    } else {
        return(
        <div className="Sidebar">
            <div id="sidebar-nav" className="sidebar">
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li><NavLink to="/login" className="nav-link"><i className="fa fa-users"></i>
                                <span>Prisijungti</span></NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
     </div>
    )
    }
    }
}

export default Sidebar;