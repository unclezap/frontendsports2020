import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';

function NavBar() {
    // use token value (true || false to determine which links to show.)
    // const token = this.props.token

    return(
            <div className="navbar">
                <Link className="nav-link" to="/">Home</Link>
                {true ? <Link className="nav-link" to="/account">My Account</Link> : null}
                <Link className="nav-link" to='/new'>Analyze Predictions</Link>
                <Link className="nav-link" to='/old'>Saved Predictions</Link>
                <Link className="nav-link" to='/info'>Popular</Link>
                <Link className="nav-link" to='/example'>Leaderboard</Link>
                {false ? null :<Link className="nav-link" to="/signup">Sign Up</Link>}
                {true ? <Button variant="outline-danger">Logout</Button>:<LoginForm className="form-group" />}
            </div>
     )
};

const mapStateToProps = state => {
    return {
        token: state.user.user.jwt
    }
}

export default connect(mapStateToProps)(NavBar);