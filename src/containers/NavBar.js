import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { kill } from '../redux';
import { revive } from '../redux';
import { signOut } from '../redux'

class NavBar extends React.Component {
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
                {this.props.style.backgroundImage1 == null ? <Button variant="outline-danger" onClick={this.handleReturn}>Return Gifs</Button> : <Button variant="outline-danger" onClick={this.handleRemove}>Remove Gifs</Button>}
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to='/new'>Individual Predictions</Link>
                <Link className="nav-link" to='/old'>All Predictions</Link>
                {!!this.props.token ? null : <Link className="nav-link" to="/signup">Sign Up</Link>}
                {!!this.props.token ? <Link className="nav-link" to="/account">My Account</Link> : null}
                {!!this.props.token ? <Button variant="outline-danger" onClick={this.handleLogout}>Logout</Button> : null}
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
    if (state.user.loaded) {
        return {
            token: state.user.user.jwt,
            style: state.style
        }
    } else {
        return {
            token: false,
            style: state.style
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);