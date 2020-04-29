import React from 'react';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';

 class TitleBar extends React.Component {
   
    showLogin = () => {
        return (
            <div style={{background: this.props.style.color1}}>
                <p style={{textColor: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>Please login or sign up to see data.</p>
                <LoginForm />
            </div>
        )
    }

    render () {
        return (
            // This will render as title, or welcome according to state of APP / props being passed.
            <div >
                <h1 style={{background: "blue", display: "flex", alignItems: "center", justifyContent: "center"}}>Hindsight is Sports2020!</h1>
                <br></br>
                {this.props.token == undefined ? this.showLogin() : null }
            </div>
        );
    }
};

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

export default connect(mapStateToProps)(TitleBar);