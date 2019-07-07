import React from 'react';
import { Link } from 'react-router-dom';
//import Auth from './Auth';

const SideNav = () => {
    return (
        <header className = "sidenav">
            <Link to = "/map" className = "sidenav__item">
                <i className="fas fa-map"></i>
            </Link>
            <Link to = "/" className = "sidenav__item">
                <i className="fas fa-clipboard-list"></i>
            </Link>
            <Link to = "/analytics" className = "sidenav__item">
                <i className="fas fa-chart-pie"></i>
            </Link>
            <Link to = "/actions" className = "sidenav__item">
                <i className="fas fa-briefcase"></i>
            </Link>
            <Link to = "/surveys" className = "sidenav__item">
                <i className="fas fa-poll"></i>
            </Link>
        </header>
    )

}

export default SideNav;