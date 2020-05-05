import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Container, Card } from 'react-bootstrap';
// import {makeAnalysis} from '../functions/analysis'
import MakeAnalysis from './MakeAnalysis'
import BarChart from '../charts/CorrectIncorrectBarChart'

class AnalysisCard extends React.Component {

    state = {
        clicked: false,
        height: "3rem"
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState(prev => {
            let newHeight
            if (prev.height === "3rem") {
                newHeight = "25rem"
            } else {
                newHeight = "3rem"
            }
            return {clicked: !prev.clicked, height: newHeight}
        })
    }

    getAnalysis = () => {
        return <MakeAnalysis predictions={this.props.predictions} scores={this.props.scores} batchId={this.props.batch.id}/>
    }
    
    render () {

        return (
            <Container fluid >
                <div style={{textAlign: "center"}}>
                <Link
                    to={`/${this.props.previousPage}`}
                    className="btn btn-outline-dark"
                    style={{width: "18rem"}}
                    onClick={(event) => this.props.onGoBack(event)}
                >Go Back</Link>
                </div>
                {this.props.analysis.loaded ? <h1>{`ESPN got ${this.props.analysis.correct} correct in total!`}</h1> : null}
                <Card 
                    style={{
                        backgroundImage: this.props.style.backgroundImage4,
                        width: '80rem',
                        height: this.state.height
                     }}
                     className="text-center"
                     
                >
                {this.props.loaded ? <Card.Title onClick={this.handleClick}>{this.props.batch.name}</Card.Title> : null}
                {this.props.loaded && this.props.predictions.length > 0 && this.state.clicked  && this.props.analysis.loaded
                ? <div>
                    {this.getAnalysis()}
                    {<BarChart analysis={this.props.analysis.batch.filter(batch => batch.id === this.props.batch.id)[0]}/>}
                  </div>
                : null}
                </Card>
            </Container>
        )
    }
}
///messed something up on line 59 and now nothing loads, possibly the batchId on line 30
const mapStateToProps = state => {
    return {
        style: state.style,
        analysis: state.analysis.batch
    }
}

export default connect(mapStateToProps)(AnalysisCard);