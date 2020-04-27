import React, {Component} from 'react';
import './Sidebar.css';
import {NavLink} from "react-router-dom";
import decode from 'jwt-decode';
import {useAuth} from '../../context/auth';

const Sidebar = (props) => {
    const {authData, removeAuthData} = useAuth();

    const logout = () => {
        removeAuthData();
    }

    let links;
    if(authData) {
        links = (
            <>
            <li><NavLink exact to="/" className="nav-link"><i className="fa fa-home"></i>
                <span>Pagrindinis</span></NavLink></li>
            <li><NavLink exact to="/igudziai" className="nav-link"><i className="fa fa-code"></i>
                <span>Įgūdžių pridėjimas</span></NavLink></li>
            <li><NavLink exact to="/paslaugos" className="nav-link"><i className="fa fa-chart-bars"></i>
                <span>Visos paslaugos</span></NavLink></li>
            <li><NavLink exact to="/portfolio" className="nav-link"><i className="fa fa-briefcase"></i>
                <span>Portfolio</span></NavLink></li>
            <li><NavLink exact to="/vartotojai" className="nav-link"><i className="fa fa-users"></i>
                <span>Vartotojai</span></NavLink></li>
            <li><NavLink exact to="/login" className="nav-link" onClick={logout}><i className="fa fa-database"></i>
                <span>Atsijungti</span></NavLink></li>
            </>
        )
    } else {
        links = (
            <>
            <li><NavLink exact to="/login" className="nav-link"><i className="fa fa-users"></i>
                                <span>Prisijungti</span></NavLink></li>
            </>
        )
    }

    return(
        <div className="Sidebar">
            <div id="sidebar-nav" className="sidebar">
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            {links}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;