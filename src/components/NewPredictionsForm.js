import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { postArticles } from '../redux'


const INITIAL_STATE = {
    articles: [],
    submitted: false
}



class NewPredictionsForm extends React.Component {
    
    state = INITIAL_STATE

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

export default NewPredictionsForm

// const mapDispatchToProps = dispatch => {
//     return {
//         onClick: (articleFromState) => postArticles(articleFromState)(dispatch)
//         //add in the post articles
//     }
// }

// export default connect(null, mapDispatchToProps)(NewPredictionsForm)