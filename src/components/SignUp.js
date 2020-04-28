import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

class SignUp extends React.Component {
    state = {
            errors: false,
            fields: {
                username: "",
                password: "",
                verifyPassword: ""
            }
        };

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
        event.preventDefault();
        if (this.state.fields.password !== this.state.fields.verifyPassword) {
            alert("Passwords do not match. Please try again.")
        } else {
            // api.user.createUser(userObject);
            // this.props.history.push('/');
            // if (localStorage.getItem("token")) {
            //     // console.log("token is there")
            //     this.props.easterEgg()
            }
            alert("Account creation succesful. Log in with your new credentials.")
        };
        
    

    render() {
        return(
            <Container>
                <Row >
                    <Col xs={5}>
                        <Form onSubmit={e => this.handleSubmit(e)}>
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
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp = (user) => postNewUser(user)(dispatch)
    }
}


export default SignUp;