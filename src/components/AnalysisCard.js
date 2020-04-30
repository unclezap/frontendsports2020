import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Container, Card } from 'react-bootstrap';
// import GameCard from './GameCard';
import {makeAnalysis} from '../functions/analysis'

class AnalysisCard extends React.Component {

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
                    onClick={(event) => this.props.onGoBack(event)}
                >Go Back</Link>
                </div>
                <Card style={{ backgroundImage: this.props.style.backgroundImage4, width: '80rem', height: '50rem' }} className="text-center">
                {this.props.batch !== undefined ? <Card.Title>{this.props.batch.name}</Card.Title> : null}
                {this.props.predictions !== undefined && this.props.predictions.length > 0 ? this.getAnalysis(): <h1>loading...</h1>}
                </Card>
            </Container>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         batch: state.article.article.batch,
//         predictions: state.article.article.predictions,
//         scores: state.article.article.scores,
//         style: state.style
//     }
// }

// export default connect(mapStateToProps)(AnalysisCard);
export default AnalysisCard