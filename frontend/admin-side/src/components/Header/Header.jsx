import React, {Component} from 'react';


class Header extends Component{
    constructor() {
        super()

    }
render() {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
			<div className="brand">
				<a href="index.html"><img src="assets/img/logo-dark.png" alt="Klorofil Logo" className="img-responsive logo"/></a>
			</div>
			<div className="container-fluid">
				<div className="navbar-btn">
					<button type="button" className="btn-toggle-fullwidth"><i className="lnr lnr-arrow-left-circle"></i></button>
				</div>
				<form className="navbar-form navbar-left">
					<div className="input-group">
						<input type="text" value="" className="form-control" placeholder="Search dashboard..."/>
						<span className="input-group-btn"><button type="button" className="btn btn-primary">Go</button></span>
					</div>
				</form>
				<div className="navbar-btn navbar-btn-right">
					<a className="btn btn-success update-pro" href="https://www.themeineed.com/downloads/klorofil-pro-bootstrap-admin-dashboard-template/?utm_source=klorofil&utm_medium=template&utm_campaign=KlorofilPro" title="Upgrade to Pro" target="_blank"><i className="fa fa-rocket"></i> <span>UPGRADE TO PRO</span></a>
				</div>
				<div id="navbar-menu">
					<ul className="nav navbar-nav navbar-right">
						<li className="dropdown">
							<a href="#" className="dropdown-toggle icon-menu" data-toggle="dropdown">
								<i className="lnr lnr-alarm"></i>
								<span className="badge bg-danger">5</span>
							</a>
							<ul className="dropdown-menu notifications">
								<li><a href="#" className="notification-item"><span className="dot bg-warning"></span>System space is almost full</a></li>
								<li><a href="#" className="notification-item"><span className="dot bg-danger"></span>You have 9 unfinished tasks</a></li>
								<li><a href="#" className="notification-item"><span className="dot bg-success"></span>Monthly report is available</a></li>
								<li><a href="#" className="notification-item"><span className="dot bg-warning"></span>Weekly meeting in 1 hour</a></li>
								<li><a href="#" className="notification-item"><span className="dot bg-success"></span>Your request has been approved</a></li>
								<li><a href="#" className="more">See all notifications</a></li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="lnr lnr-question-circle"></i> <span>Help</span> <i className="icon-submenu lnr lnr-chevron-down"></i></a>
							<ul className="dropdown-menu">
								<li><a href="#">Basic Use</a></li>
								<li><a href="#">Working With Data</a></li>
								<li><a href="#">Security</a></li>
								<li><a href="#">Troubleshooting</a></li>
							</ul>
						</li>
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown"><img src="assets/img/user.png" className="img-circle" alt="Avatar"/> <span>Samuel</span> <i className="icon-submenu lnr lnr-chevron-down"></i></a>
							<ul className="dropdown-menu">
								<li><a href="#"><i className="lnr lnr-user"></i> <span>My Profile</span></a></li>
								<li><a href="#"><i className="lnr lnr-envelope"></i> <span>Message</span></a></li>
								<li><a href="#"><i className="lnr lnr-cog"></i> <span>Settings</span></a></li>
								<li><a href="#"><i className="lnr lnr-exit"></i> <span>Logout</span></a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
    )
}
}

export default Header;