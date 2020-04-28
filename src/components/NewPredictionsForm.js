import React from 'react';
// import {Button, Container} from 'react-bootstrap';
import { connect } 'react-redux';

const INITIAL_STATE = {
    articles: []
}

class NewPredictionsForm extends React.Component {
    
    state = INITIAL_STATE

    render () {
        <div>
            <p>To do</p>
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: (articleFromState) => postArticle(articleFromState)(dispatch)
        //add in the post articles
    }
}

export default connect(null, mapDispatchToProps)(NewPredictionsForm)