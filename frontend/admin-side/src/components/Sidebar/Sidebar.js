import React from 'react';
import './Sidebar.css';
import {NavLink} from "react-router-dom";


function Sidebar(){
    return(
        <div className="Sidebar">
            <div id="sidebar-nav" className="sidebar">
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li><NavLink to="/" className="nav-link"><i className="fa fa-home"></i>
                                <span>Pagrindinis</span></NavLink></li>
                            <li><NavLink to="/kategorijos" className="nav-link"><i className="fa fa-code"></i>
                                <span>Sukurti kategoriją</span></NavLink></li>
                            <li><NavLink to="/skelbimai" className="nav-link"><i className="fa fa-chart-bars"></i>
                                <span>Skelbimai</span></NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
     </div>
    )
}

export default Sidebar;