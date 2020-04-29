import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';

class NavBar extends React.Component {
    // use token value (true || false to determine which links to show.)
    // const token = this.props.token
    // state = {}

    render () {
        return (
            <div className="navbar">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to='/new'>Analyze Predictions</Link>
                <Link className="nav-link" to='/old'>Saved Predictions</Link>
                <Link className="nav-link" to='/info'>Popular</Link>
                <Link className="nav-link" to='/example'>Leaderboard</Link>
                {this.props.token !== undefined ? null : <Link className="nav-link" to="/signup">Sign Up</Link>}
                {this.props.token !== undefined ? <Button variant="outline-danger">Logout</Button> : <LoginForm className="form-group" />}
                {this.props.token !== undefined ? <Link className="nav-link" to="/account">My Account</Link> : null}
            </div>
        )
    }

};

const mapStateToProps = state => {
    return {
        token: state.user.user.jwt
    }
}

export default connect(mapStateToProps)(NavBar);