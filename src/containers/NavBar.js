import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function NavBar() {
    // use token value (true || false to determine which links to show.)
    const token = localStorage.getItem("token")

    return(
            <div className="navbar">
                <Link className="nav-link" to="/">Home</Link>
                {token ? <Link className="nav-link" to="/account">My Account</Link> : null}
                <Link className="nav-link" to='/new'>Analyze Predictions</Link>
                <Link className="nav-link" to='/old'>Saved Predictions</Link>
                <Link className="nav-link" to='/info'>Popular</Link>
                <Link className="nav-link" to='/example'>Leaderboard</Link>
                {token ? null:<Link className="nav-link" to="/signup">Sign Up</Link>}
                {token ? <Button variant="outline-danger">Logout</Button>:<LoginForm className="form-group" />}
            </div>
     )
};

export default NavBar;