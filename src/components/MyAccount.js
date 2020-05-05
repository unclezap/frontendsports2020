import React from 'react';
import AuthHOC from '../HOC/AuthHOC';
// import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class MyAccount extends React.Component {

    //add password change button
    render() {

        return(
            <div>
                <h4>Username: {this.props.username} </h4>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        username: state.user.user.user.username
    }
}

export default AuthHOC(connect(mapStateToProps)(MyAccount));