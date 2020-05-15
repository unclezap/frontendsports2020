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
            <div >
                <h1 style={{background: "blue", display: "flex", alignItems: "center", justifyContent: "center", color: "red"}}>Hindsight is Sports2020!</h1>
                <br></br>
                {/* <p style={{background: "white", display: "flex", alignItems: "center", justifyContent: "center"}}></p> */}
                {this.props.token === undefined ? this.showLogin() : null }
                {/* <br style={{background: "red", display: "flex", alignItems: "center", justifyContent: "center"}}></br> */}
                <div style={{background: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <p ></p>
                <h3> Sports2020 is a truth-in-journalism watchdog site, keeping ESPN accountable for their football predictions.</h3>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    if (state.user.loaded) {
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