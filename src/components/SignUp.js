import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { postNewUser } from '../redux';
import { connect } from 'react-redux';
import ReverseAuthHOC from '../HOC/ReverseAuthHOC'
import {Redirect} from 'react-router-dom'

const INITIAL_STATE = {
    errors: false,
    fields: {
        username: "",
        password: "",
        verifyPassword: ""
    }
}

class SignUp extends React.Component {
    state = INITIAL_STATE

    handleChange = (event) => {
        const newFields = {...this.state.fields, [event.target.name]: event.target.value};
        this.setState({
            fields: newFields
        });
    };
    
    handleSubmit = (event) => {
        event.preventDefault()
        let userObject = {
            username: this.state.fields.username,
            password: this.state.fields.password
        }
        if (this.state.fields.password !== this.state.fields.verifyPassword) {
            alert("Passwords do not match. Please try again.")
            this.setState(INITIAL_STATE)
        } else {
            this.actualSignUp(userObject)
            //map state to props and give the alert if it worked
            
        }
    };
        
    actualSignUp = (user) => {
        this.props.onSignUp(user)
    }

    render() {
        return(
            <Container>
                <Row >
                    <Col xs={5}>
                        {!this.props.loaded ? <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Group >
                                <Form.Label>
                                    Username:
                                </Form.Label>
                                <Form.Control 
                                    name="username" 
                                    placeholder="New Username" 
                                    onChange={this.handleChange}
                                    type="text" 
                                    value={this.state.fields.username}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control 
                                    name="password"
                                    onChange={this.handleChange}
                                    placeholder="Password" 
                                    type="password" 
                                    value={this.state.fields.password}
                                    />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>
                                    Verify Password:
                                </Form.Label>
                                <Form.Control 
                                name="verifyPassword"
                                onChange={this.handleChange}
                                placeholder="Password"
                                value={this.state.fields.verifyPassword}
                                type="password"
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary">Submit</Button>
                        </Form> : <Redirect to="/"/>}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (user) => postNewUser(user)(dispatch)
    }
}

const mapStateToProps = state => {
    return {
        loaded: state.user.loaded
    }
}


export default ReverseAuthHOC(connect(mapStateToProps, mapDispatchToProps)(SignUp));