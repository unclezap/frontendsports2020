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

    // handleClick = () => {
    //     this.setState(prev => {
    //         let newHeight
    //     })
    // }

    getAnalysis = () => {
        return makeAnalysis(this.props.predictions, this.props.scores)
    }
    
    render () {
        return (
            <Container fluid>
                <div style={{textAlign: "center"}}>
                <Link
                    to={`/${this.props.previousPage}`}
                    className="btn btn-outline-dark"
                    style={{width: "18rem"}}
                    // onClick={(event) => this.props.onGoBack(event)}
                >Go Back</Link>
                </div>
                <Card 
                    style={{
                        backgroundImage: this.props.style.backgroundImage4,
                        width: '80rem',
                        height: '50rem'
                     }}
                     className="text-center"
                     onClick={this.handleClick}
                >
                {this.props.loaded ? <Card.Title>{this.props.batch.name}</Card.Title> : null}
                {this.props.loaded && this.props.predictions.length > 0 ? this.getAnalysis(): <h1>loading...</h1>}
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