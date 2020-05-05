import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { postArticle } from '../redux';
import AnalysisCard from '../components/AnalysisCard';
import AuthHOC from '../HOC/AuthHOC';

const INITIAL_STATE = {
    fields: {
        article: ""
    },
    submitted: false,
    failure: false,
    spinner: Math.floor(Math.random()*2) + 1
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
    }

    handleGoBack = (event) => {
        // event.preventDefault();
        this.setState({submitted: false})

    }

    render () {
        return (
            <div style={{background: this.props.color3, display: "flex", alignItems: "center", justifyContent: "center"}}>
                {this.state.submitted && !this.props.failure && !this.props.loading && this.props.loaded
                ? <AnalysisCard
                    previousPage={"new"}
                    onGoBack={this.handleGoBack.bind(this)}
                    predictions={this.props.batch.predictions}
                    scores={this.props.batch.scores}
                    batch={this.props.batch} 
                    loaded={this.props.loaded}
                 /> 
                : 
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
                                <Button type="submit">
                                    Analyze predictions
                                </Button>
                            </div>
                        </form>
                        <h3>{this.props.failure ? "Hmm, that didn't seem to work. Try again!" : null}</h3>
                        <h2>{this.props.loading && this.state.spinner === 1? <div style={{backgroundImage: this.props.style.loading1, height: "460px", width: "460px"}}/> : null }</h2>
                        <h2>{this.props.loading && this.state.spinner === 2? <div style={{backgroundImage: this.props.style.loading2, height: "460px", width: "460px"}}/> : null }</h2>
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
        failure: state.batches.failure,
        loading: state.batches.loading,
        loaded: state.batches.loaded,
        batch: state.batches.batches[0],
        // predictions: state.batches.batches[0].predictions,
        // scores: state.batches.batches[0].scores,
        style: state.style
    }
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(NewPredictionsForm))