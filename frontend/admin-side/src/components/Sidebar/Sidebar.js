import React from 'react';
import './Sidebar.css';

function Sidebar(){
    return(
        <div className="Sidebar">
            <div id="sidebar-nav" className="sidebar">
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li><a href="/home" className="nav-link active"><i className="fa fa-home"></i>
                                <span>Pagrindinis</span></a></li>
                            <li><a href="/kategorijos" className="nav-link"><i className="fa fa-code"></i>
                                <span>Sukurti kategoriją</span></a></li>
                            <li><a href="/skelbimai" className="nav-link"><i className="fa fa-chart-bars"></i>
                                <span>Skelbimai</span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
     </div>
    )
}

export default Sidebar;