import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Container, Card } from 'react-bootstrap';
import {makeAnalysis} from '../functions/analysis'

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
        return makeAnalysis(this.props.predictions, this.props.scores, true)
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
                <Card 
                    style={{
                        backgroundImage: this.props.style.backgroundImage4,
                        width: '80rem',
                        height: this.state.height
                     }}
                     className="text-center"
                     
                >
                {this.props.loaded ? <Card.Title onClick={this.handleClick}>{this.props.batch.name}</Card.Title> : null}
                {this.props.loaded && this.props.predictions.length > 0 && this.state.clicked ? this.getAnalysis(): null}
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        style: state.style
    }
}

export default connect(mapStateToProps)(AnalysisCard);