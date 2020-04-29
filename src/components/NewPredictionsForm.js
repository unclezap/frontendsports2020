import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { postArticle } from '../redux';
import AnalysisCard from '../components/AnalysisCard';
import AuthHOC from '../HOC/AuthHOC';

const INITIAL_STATE = {
    fields: {
        article: "",
        name: ""
    },
    submitted: false,
    failure: false,
}

class NewPredictionsForm extends React.Component {
    
    state = INITIAL_STATE

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({submitted: true}, ()=> this.props.onPostArticle(this.state.fields))
    }

    handleChange = (event) => {
        const newFields = {...this.state.fields, [event.target.name]: event.target.value};
        this.setState({
            fields: newFields,
            submitted: false
        });

        // event.preventDefault()
        // console.log(event.target.value)
        // console.log(event)
        // this.setState(prev=>{
        //         return {
        //             ...prev.state,
        //             [event.target.name]: event.target.value,
        //             submitted: false
        //         }   
        //     }
        // )
    }

    handleGoBack = (event) => {
        event.preventDefault();
        this.setState({submitted: false})

    }

    render () {
//add a loading animation below
        return (
            <div>
                {this.state.submitted && !this.props.failure && !this.props.loading ? <AnalysisCard previousPage={"new"} onGoBack={this.handleGoBack.bind(this)}/> : 
                        <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor="website">
                                    Add a website:
                                </label>
                                <input
                                    type="text"
                                    name="article"
                                    placeholder="please enter a url"
                                    value={this.state.fields.article}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">
                                    Name this prediction:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="optional"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <Button type="submit">
                                    Analyze predictions
                                </Button>
                            </div>
                        </form>
                        <h3>{this.props.failure ? "Hmm, that didn't seem to work. Try again!" : null}</h3>
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostArticle: (article) => postArticle(article)(dispatch)
    }
}

const mapStateToProps = state => {
    return {
        failure: state.article.failure,
        loading: state.article.loading,
    }
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(NewPredictionsForm))