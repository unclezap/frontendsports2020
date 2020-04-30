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
        event.preventDefault();
        this.setState({submitted: false})

    }

    render () {
//add a loading animation below
        return (
            <div style={{background: this.props.color3, display: "flex", alignItems: "center", justifyContent: "center"}}>
                {this.state.submitted && !this.props.failure && !this.props.loading ? <AnalysisCard previousPage={"new"} onGoBack={this.handleGoBack.bind(this)} predictions={this.props.predictions} scores={this.props.scores}/> : 
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
        failure: state.article.failure,
        loading: state.article.loading,
        style: state.style,
        batch: state.article.article.batch,
        predictions: state.article.article.predictions,
        scores: state.article.article.scores,
    }
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(NewPredictionsForm))