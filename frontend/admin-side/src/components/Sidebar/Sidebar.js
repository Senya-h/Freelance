import React, {useState, useHistory} from 'react';
import {Button} from 'react-bootstrap';
import './Sidebar.css';
import wrapper from './Wrapper.module.scss'
import {NavLink} from "react-router-dom";
import decode from 'jwt-decode';
import {useAuth} from '../../context/auth';

const Sidebar = (props) => {
    const {authData, removeAuthData} = useAuth();
    const [wrapp, setWrapp] = useState(0);

    const logout = () => {
        removeAuthData();
    }


    let links;
    console.log(wrapp);
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
    let btn;
        if(wrapp === 0) {
            btn = (
                <>
                <Button className={`menuWrapper ${wrapper.menuWrapper}`} onClick={() => setWrapp(1)}>Meniu</Button>
                </>
            )
        } else if (wrapp === 1) {
            btn = (
            <>
                <Button className={`menuWrapper ${wrapper.menuWrapper}`} onClick={() => setWrapp(0)}>Meniu</Button>
            </>
            )
        }

    return(
        <div className="Sidebar">
            <div id={`sidebar-nav`} className={`sidebar ${wrapp===1 ? wrapper.sidebar1 : wrapper.sidebar2}`}>
                <div className="sidebar-scroll">
                    {btn}
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