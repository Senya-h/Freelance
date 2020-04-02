import React from 'react';
import './sidebar.scss';

function Sidebar(){
    return(
        <div className="Sidebar">
        <div id="sidebar-nav" className="sidebar">
            <div className="sidebar-scroll">
                <nav>
                    <ul className="nav">
                        <li><a href="/" className="active"><i className="lnr lnr-home"></i> <span>Pagrindinis</span></a></li>
                        <li><a href="/kategorijos" className=""><i className="lnr lnr-code"></i> <span>Nauja kategorija</span></a></li>
                        <li><a href="/skelbimai" className=""><i className="lnr lnr-chart-bars"></i> <span>Skelbimai</span></a></li>
                    </ul>
                </nav>
            </div>
        </div>
     </div>
    )
}

export default Sidebar;