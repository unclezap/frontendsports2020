import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { postArticle } from '../redux'

const INITIAL_STATE = {
    article: "",
    submitted: false
}

class NewPredictionsForm extends React.Component {
    
    state = INITIAL_STATE

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({submitted: "true"}, ()=> this.props.onPostArticle(this.state))
    }

    handleChange = (event) => {
        this.setState({
            article: event.target.value
        })
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="website">
                            Add a website:
                        </label>
                        <input
                            type="text"
                            name="website"
                            placeholder="please enter a website"
                            value={this.state.article}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <Button type="submit">
                            Analyze predictions
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostArticle: (article) => postArticle(article)(dispatch)
    }
}

export default connect(null, mapDispatchToProps)(NewPredictionsForm)