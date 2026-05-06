import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Alen's Barbershop</Link>
            </div>
            <div className="navbar-menu">
                <Link to="/">Početna</Link>
                <Link to="/reviews">Recenzije</Link>
            </div>
        </nav>
    );
}

export default Navbar;