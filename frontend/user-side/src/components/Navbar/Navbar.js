import React, {useEffect, useRef} from 'react';
import {Navbar as NavBar} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import classes from './Navbar.module.scss';
import cx from 'classnames';

const Navbar = () => {
    
    useEffect(() => {
        return () => { //Will remove the event listener if the component gets unmounted
            window.removeEventListener('scroll', () => handleScroll)
        }
      }, [])
      console.log(classes);
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
        if (offsetTop > 350 ) {
            if ( !navbar.current.classList.contains(classes.awake) ) {
                navbar.current.classList.add(classes.awake);	
            } 
        }
        if (offsetTop < 350 ) {
            if (navbar.current.classList.contains(classes.awake) ) {
                navbar.current.classList.remove(classes.awake);
                navbar.current.classList.add(classes.sleep);
            }
        }
      }
    
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
    
    window.addEventListener("scroll", debounce(handleScroll));

    return (
        <NavBar bg="dark" expand="lg" className={classes.FtcoNavbarLight} id="ftco-navbar" ref={navbar}>
            <div className="container-fluid px-md-4	">
                <Link to='/' exact className={cx('navbar-brand', classes['navbar-brand'])}>Skillhunt</Link>
                <NavBar.Toggle className={classes['navbar-toggler']} data-toggle="collapse" data-target="#ftco-nav"
                        aria-controls="ftco-nav">
                    <span className="oi oi-menu"></span> Menu
                </NavBar.Toggle>

                <NavBar.Collapse id="ftco-nav">
                    <ul className={cx("navbar-nav ml-auto", classes['navbar-nav'])}>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/profile' activeClassName={classes['active']}>
                                My Profile
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/' exact activeClassName={classes['active']}>
                                Home
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/jobs' activeClassName={classes['active']}>
                                Browse Jobs
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/candidates' activeClassName={classes['active']}>
                                Candidates
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/contact' activeClassName={classes['active']}>
                                Contact
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'], classes.cta,'mr-md-1')}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/login' activeClassName={classes['active']}>
                                Login
                            </NavLink>
                        </li>
                        <li className={cx('nav-item', classes['nav-item'], classes.cta, classes['cta-colored'])}>
                            <NavLink className={cx('nav-link', classes['nav-link'])} to='/register' activeClassName={classes['active']}>
                                Register
                            </NavLink>
                        </li>
                    </ul>
                </NavBar.Collapse>
            </div>
        </NavBar>
    )
};

export default Navbar;