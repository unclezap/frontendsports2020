import React, { Component } from 'react';
import { postLogin } from '../redux';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

class LoginForm extends Component {
    state = {
            error: false,
            fields: {
                username: "",
                password: ""
            }
        };

    handleChange = (event) => {
        const newFields = {...this.state.fields, [event.target.name]: event.target.value};
        this.setState({
            fields: newFields
        });
    };
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.actualLogin(this.state.fields);
    }

    actualLogin = (user) => {
        this.props.onPostLogin(user)
    };

    render() {
        return (
            <div>
                    <form onSubmit={event => this.handleSubmit(event)} style={{background: "white", display: "flex", alignItems: "center", justifyContent: "center"}}> 
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input 
                            type="text"
                            name="username"
                            onChange={this.handleChange} value={this.state.fields.username}
                        />
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange} value={this.state.fields.password}
                        />
                        <Button
                            variant="outline-primary" type="submit">
                                Log In
                        </Button>
                    </form>
                </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPostLogin: (user) => postLogin(user)(dispatch)
    }
}

const mapStateToProps = state => {
    return {
        style: state.style
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);