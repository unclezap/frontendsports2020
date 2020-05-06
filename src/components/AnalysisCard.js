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
        // thisAnalysisBatch: this.props.analysis.batch.filter(batch => batch.id === this.props.batch.id)
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
        return <MakeAnalysis predictions={this.props.predictions} scores={this.props.scores} batchId={this.props.batch.id} week={this.props.batch.week}/>
    }
    
    render () {
        //individual GameCards on the lowest level send analysis to the state.  Need for that data to get back to the store before displaying analysis info or passing that particular analysis info as props
        let theCircleIsNowComplete = false

        let thisParticularAnalysis = this.props.analysis.batch.filter(batch => batch.batchId === this.props.batch.id)

        if (thisParticularAnalysis.length > 0) {
            theCircleIsNowComplete = true
            // console.log("thisParticularAnalysis",thisParticularAnalysis)
            thisParticularAnalysis = thisParticularAnalysis[0]
        } 

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
                {theCircleIsNowComplete ? <h1>{`ESPN got ${thisParticularAnalysis.correct} correct in total!`}</h1> : null}
                <Card 
                    style={{
                        backgroundImage: this.props.style.backgroundImage4,
                        width: '80rem',
                        height: this.state.height
                     }}
                     className="text-center"
                     
                >
                {this.props.loaded ? <Card.Title onClick={this.handleClick}>{this.props.batch.name}</Card.Title> : null}
                {this.props.loaded && this.props.predictions.length > 0 && this.state.clicked 
                ? <div>
                    {this.getAnalysis()}
                    {<BarChart analysis={thisParticularAnalysis}/>}
                  </div>
                : null}
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        style: state.style,
        analysis: state.analysis
    }
}

export default connect(mapStateToProps)(AnalysisCard);