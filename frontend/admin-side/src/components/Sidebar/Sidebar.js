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
    const [dropDown, setDrop] = useState('collapse');
    const [roleDropDown, setRoleDrop] = useState('collapse');
    const [usersDropDown, setUsersDrop] = useState('collapse');

    const logout = () => {
        removeAuthData();
    }
    const setZero = (drop) => {
        setDrop('collapse')
        setRoleDrop('collapse')
        setUsersDrop('collapse')
        if(drop === 'usr') {
            setUsersDrop('active')
        } else if (drop === 'role') {
            setRoleDrop('active')
        } else if (drop === 'portf') {
            setDrop('active')
        }
    }


    let links;
    if(authData) {
        links = (
            <>
            <li><NavLink exact to="/" className="nav-link" onClick={() => setZero('none')}><i className="fa fa-home"></i>
                <span>Pagrindinis</span></NavLink></li>
                <li>
			<NavLink to={roleDropDown === "collapse" ? `/role` : `#`} className="nav-link" onClick={roleDropDown === "collapse" ? () => setZero('role') : () => setRoleDrop('collapse')}><i className="fa fa-briefcase"></i><span>Rolės</span></NavLink>
			    <div className={`dropdownMenu ${roleDropDown}`}>
					<ul className="nav">
                        <li><NavLink exact to="/role">Duoti rolę</NavLink></li>
                        <li><NavLink exact to="/role/remove">Atimti rolę</NavLink></li>
					</ul>
				</div>
			</li>
            <li><NavLink exact to="/igudziai" className="nav-link" onClick={() => setZero('none')}><i className="fa fa-code"></i>
                <span>Įgūdžių pridėjimas</span></NavLink></li>
            <li>
				<NavLink to={dropDown === "collapse" ? `/portfolio` : `#`} className="nav-link" onClick={dropDown === "collapse" ? () => setZero('portf') : () => setDrop('collapse')}><i className="fa fa-briefcase"></i><span>Portfolio</span></NavLink>
				<div className={`dropdownMenu ${dropDown}`}>
					<ul className="nav">
                        <li><NavLink exact to="/portfolio">Darbai</NavLink></li>
                        <li><NavLink exact to="/formats">Formatų pridėjimas</NavLink></li>
					</ul>
				</div>
			</li>
            <li><NavLink exact to="/paslaugos" className="nav-link" onClick={() => setZero('none')}><i className="fa fa-chart-bars"></i>
                <span>Visos paslaugos</span></NavLink></li>

            <li>
			    <NavLink to={usersDropDown === "collapse" ? `/vartotojai` : `#`} className="nav-link" onClick={usersDropDown === "collapse" ? () => setZero('usr') : () => setUsersDrop('collapse')}><i className="fa fa-users"></i><span>Vartotojai</span></NavLink>
				<div className={`dropdownMenu ${usersDropDown}`}>
					<ul className="nav">
                        <li><NavLink exact to="/vartotojai">Visi</NavLink></li>
                        <li><NavLink exact to="/banned">Užblokuoti</NavLink></li>
					</ul>
				</div>
			</li>

            <li><NavLink exact to="/login" className="nav-link" onClick={logout} onClick={() => setZero('none')}><i className="fa fa-paper-plane-o"></i>
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
                <Button variant="outline-dark" className={`menuWrapper ${wrapper.menuWrapper}`} onClick={() => setWrapp(1)}>Meniu</Button>
                </>
            )
        } else if (wrapp === 1) {
            btn = (
            <>
                <Button variant="outline-light" className={`menuWrapper ${wrapper.menuWrapper} ${wrapper.menuWrapper1}`} onClick={() => setWrapp(0)}>Meniu</Button>
            </>
            )
        }

    return(
        <div className="Sidebar">
        <div className={`overlay ${wrapp===1 ? wrapper.overlay1 : wrapper.overlay2}`} onClick={() => setWrapp(0)}></div>
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