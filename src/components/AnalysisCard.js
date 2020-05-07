import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Container, Card } from 'react-bootstrap';
import MakeAnalysis from './MakeAnalysis'
import BarChart from '../charts/CorrectIncorrectBarChart'

class AnalysisCard extends React.Component {
    state = {
        clicked: false,
        // height: "3rem"
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState(prev => {
            let newHeight
            let display
            // if (prev.height === "3rem") {
                // newHeight = "25rem"
                // display="flex"
            // } else {
                // newHeight = "3rem"
            // }
            // return {clicked: !prev.clicked, height: newHeight}
            return {clicked: !prev.clicked, display: "flex"}
        })
    }

    getAnalysis = () => {
        return <MakeAnalysis predictions={this.props.predictions} scores={this.props.scores} batchId={this.props.batch.id} week={this.props.batch.week}/>
    }
    
    render () {
        let theCircleIsNowComplete = false

        let thisParticularAnalysis = this.props.analysis.batch.filter(batch => batch.batchId === this.props.batch.id)

        if (thisParticularAnalysis.length > 0) {
            theCircleIsNowComplete = true
            thisParticularAnalysis = thisParticularAnalysis[0]
        } 

        return (
            <Container fluid display="flex" style={{textAlign: "center", justifyContent: "center"}}>
                <div style={{ justifyContent: "center", display: "flex"}}>
                {/* <div style={{textAlign: "center"}}> */}
                {this.props.previousPage === "new" ? <Link
                    to={`/${this.props.previousPage}`}
                    className="btn btn-outline-dark"
                    // style={{width: "18rem"}}
                    onClick={(event) => this.props.onGoBack(event)}
                >Go Back</Link> : null}
                </div>
                {theCircleIsNowComplete ? <h1>{`ESPN got ${Math.round(100*thisParticularAnalysis.correct/(thisParticularAnalysis.correct + thisParticularAnalysis.incorrect))}% correct!`}</h1> : null}
                {this.props.previousPage === "new" ? <div><p>Each game card is colored based on the accuracy of ESPN's predictions - green cards represent W/L outcomes that were predicted completely correctly, red cards represent outcomes that were not predicted, and yellow cards represent cases where two different pundits predicted different W/L results.</p><br></br><p>The opacity of the card indicates the accuracy of the result.  Games where the margin of victory was close to ESPN's average predicted margin of victory are shaded darkly, while games where ESPN's predicted scores were off the mark are shaded dimly.</p> </div>: null}
                <Card 
                    style={{
                        backgroundImage: this.props.style.backgroundImage4,
                        // width: '80rem',
                        // height: this.state.height
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