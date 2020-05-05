import React, {useEffect, useRef} from 'react';
import {Navbar as NavBar} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import classes from './Navbar.module.scss';
import cx from 'classnames';
import {useAuth} from '../../context/auth';

//Reduces the amount of time the scroll event is called
const debounce = (callback, wait, immediate = false) => {
    let timeout = null 
    
    return function() {
        const callNow = immediate && !timeout
        const next = () => callback.apply(this, arguments)
        
        clearTimeout(timeout)
        timeout = setTimeout(next, wait)
    
        if (callNow) {
        next()
        }
    }
}

const Navbar = () => {
    
    useEffect(() => {
        return () => { //Will remove the event listener if the component gets unmounted
            window.removeEventListener('scroll', () => handleScroll)
        }
      }, [])
    //Uses the navbar reference for its class list
    const navbar = useRef(null); 

    //Depending on the offset from the top of the page, sets navbar classes for sticky-ness
    const handleScroll = () => {

    const offsetTop = window.pageYOffset;

    if (offsetTop > 150) {
        if ( !navbar.current.classList.contains(classes.scrolled) ) {
            navbar.current.classList.add(classes.scrolled);	
        }
    } 
    if (offsetTop < 150) {
        if ( navbar.current.classList.contains(classes.scrolled) ) {
            navbar.current.classList.remove(classes.scrolled, classes.sleep);
        }
    } 
    if (offsetTop > 175 ) {
        if ( !navbar.current.classList.contains(classes.awake) ) {
            navbar.current.classList.add(classes.awake);	
        } 
    }
    if (offsetTop < 175 ) {
        if (navbar.current.classList.contains(classes.awake) ) {
            navbar.current.classList.remove(classes.awake);
            navbar.current.classList.add(classes.sleep);
        }
    }
    }
    
    window.addEventListener("scroll", debounce(handleScroll));

    const {removeAuthData, authData} = useAuth()

    const logOut = () => {
        removeAuthData()
    }

    let loginArea = null;
    // if it's a freelancer
    if(authData) {
        if(authData.userRole === 3) {
            loginArea = (
                <>
                    <li className={cx('nav-item', classes['nav-item'])}>
                        <NavLink className={cx('nav-link', classes['nav-link'])} to='/messages' activeClassName={classes['active']}>
                            Pranešimai
                        </NavLink>
                    </li>
                    <li className={cx('nav-item', classes['nav-item'], classes.cta,'mr-md-1')}>
                        <NavLink className={cx('nav-link', classes['nav-link'])} to='/profile' activeClassName={classes['active']}>
                             Profilis
                        </NavLink>
                    </li>
                    <li className={cx('nav-item', classes['nav-item'], classes.cta, classes['cta-colored'])}>
                        <Link className={cx('nav-link', classes['nav-link'])} to='/' onClick={logOut}>
                            Atsijungti
                        </Link>
                    </li>
                </>
            )
        } else if(authData.userRole === 2) {
            loginArea = (
                <>
                    <li className={cx('nav-item', classes['nav-item'], classes.cta,'mr-md-1')}>
                        <NavLink className={cx('nav-link', classes['nav-link'])} to='/new-offer' activeClassName={classes['active']}>
                             Sukurti skelbimą
                        </NavLink>
                    </li>
                    <li className={cx('nav-item', classes['nav-item'], classes.cta,'mr-md-1')}>
                        <NavLink className={cx('nav-link', classes['nav-link'])} to='/my-jobs' activeClassName={classes['active']}>
                             Mano Skelbimai
                        </NavLink>
                    </li>
                    <li className={cx('nav-item', classes['nav-item'])}>
                        <NavLink className={cx('nav-link', classes['nav-link'])} to='/messages' activeClassName={classes['active']}>
                            Pranešimai
                        </NavLink>
                    </li>
                    <li className={cx('nav-item', classes['nav-item'], classes.cta,'mr-md-1')}>
                        <NavLink className={cx('nav-link', classes['nav-link'])} to='/profile' activeClassName={classes['active']}>
                             Profilis
                        </NavLink>
                    </li>
                    <li className={cx('nav-item', classes['nav-item'], classes.cta, classes['cta-colored'])}>
                        <Link className={cx('nav-link', classes['nav-link'])} to='/' onClick={logOut}>
                            Atsijungti
                        </Link>
                    </li>
                </>
            )
        }

    } else {
        loginArea = (
            <>
                <li className={cx('nav-item', classes['nav-item'], classes.cta,'mr-md-1')}>
                    <NavLink className={cx('nav-link', classes['nav-link'])} to='/login' activeClassName={classes['active']}>
                        Prisijungti
                    </NavLink>
                </li>
                <li className={cx('nav-item', classes['nav-item'], classes.cta, classes['cta-colored'])}>
                    <NavLink className={cx('nav-link', classes['nav-link'])} to='/register' activeClassName={classes['active']}>
                        Registruotis
                    </NavLink>
                </li>
            </>
            )
    }

    return (
        <NavBar bg="dark" expand="lg" className={classes.FtcoNavbarLight} id="ftco-navbar" ref={navbar}>
            <div className="container-fluid px-md-4	">
                <Link to='/' className={cx('navbar-brand', classes['navbar-brand'])}>Workify</Link>
                <NavBar.Toggle className={classes['navbar-toggler']} data-toggle="collapse" data-target="#ftco-nav"
                        aria-controls="ftco-nav">
                    <span className="oi oi-menu"></span> Menu
                </NavBar.Toggle>

                <NavBar.Collapse id="ftco-nav">
                    <ul className={cx("navbar-nav ml-auto", classes['navbar-nav'])}>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/' exact activeClassName={classes['active']}>
                                Pagrindinis
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/jobs' activeClassName={classes['active']}>
                                Skelbimai
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/freelancers' activeClassName={classes['active']}>
                                Freelanceriai
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/contact' activeClassName={classes['active']}>
                                Kontaktai
                            </NavLink>
                        </li>
                        { loginArea }
                    </ul>
                </NavBar.Collapse>
            </div>
        </NavBar>
    )
};

export default Navbar;