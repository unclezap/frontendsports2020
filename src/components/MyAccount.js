import React from 'react';
import AuthHOC from '../HOC/AuthHOC';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class MyAccount extends React.Component {

    componentDidMount() {
        
    };

    render() {
        const { username } = this.props.user;

        return(
            <div>
                <h4>Username: {username}</h4>
                <Button variant="outline-dark" onClick={this.quizToggle}>My Quizzes</Button>
                {this.state.quizClick ? this.seeMyQuizzes() : null}
                <Button variant="outline-dark" onClick={this.scoreToggle}>My Scores</Button>
                {this.state.scoreClick ? this.seeMyScores(): null}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default AuthHOC(connect(mapStateToProps)(MyAccount));