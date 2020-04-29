import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';
import { kill } from '../redux';
import { revive } from '../redux';
import { signOut } from '../redux'

class NavBar extends React.Component {
    // use token value (true || false to determine which links to show.)
    state = {}

    handleRemove = () => {
        this.props.onKill();
    }

    handleReturn = () => {
        this.props.onRevive();
    }

    handleLogout = () => {
        this.props.onLogout();
    }

    render () {
        return (
            <div className="navbar">
                {this.props.style.backgroundImage1 == null ? <Button variant="outline-danger" onClick={this.handleReturn}>Return CSS</Button> : <Button variant="outline-danger" onClick={this.handleRemove}>Remove CSS</Button>}
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to='/new'>Analyze Predictions</Link>
                <Link className="nav-link" to='/old'>Saved Predictions</Link>
                {this.props.token !== undefined ? null : <Link className="nav-link" to="/signup">Sign Up</Link>}
                {this.props.token !== undefined ? <Button variant="outline-danger" onClick={this.handleLogout}>Logout</Button> : <Link className="nav-link" to="/">Log In</Link>}
                {this.props.token !== undefined ? <Link className="nav-link" to="/account">My Account</Link> : null}
            </div>
        )
    }

};

const mapDispatchToProps = dispatch => {
    return {
        onKill: () => dispatch(kill()),
        onRevive: () => dispatch(revive()),
        onLogout: () => dispatch(signOut())
    }
}

const mapStateToProps = state => {
    if (state.user.user !== undefined) {
        return {
            token: state.user.user.jwt,
            style: state.style
        }
    } else {
        return {
            style: state.style
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);