import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth';

const Navbar = () => {
    return (
        <header className = "navbar">
            <Link to = "/board" className = "navbar__item">
                Board
            </Link>
            <Link to = "/analytics" className = "navbar__item">
                Analytics
            </Link>
            <Link to = "/actions" className = "navbar__item">
                Actions
            </Link>
            <Link to = "/surveys" className = "navbar__item">
                Surveys
            </Link>
            <Auth/>
        </header>
    )

}

export default Navbar;