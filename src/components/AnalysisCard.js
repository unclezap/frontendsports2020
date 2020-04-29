import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card';

class AnalysisCard extends React.Component {

    // const {batch} = this.props.batch
    // makeCard = () => {
    //     return <p>{this.props.batch.name}</p>
    // }

    render () {
        console.log(this.props)
        return (

            <Card style={{ backgroundImage: this.props.style.backgroundImage4, width: '100rem', height: '50rem' }} className="text-center">
                {this.props.batch !== undefined ? <Card.Title>{this.props.batch.name}</Card.Title> : null}
                {/* {this.makeCard()} */}
                
                {/* <Card.Text >{description}</Card.Text> */}
                {/* <Card.Subtitle className="text-muted">Category: {category}</Card.Subtitle> */}
                <h3>ANALYSIS</h3>
                <Link
                    to={`/${this.props.previousPage}`} className="btn btn-outline-dark"
                    onClick={(event) => this.props.onGoBack(event)}
                >Go Back</Link>
                {/* <ScoreCard /> */}
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        batch: state.article.article.batch,
        predictions: state.article.article.predictions,
        scores: state.article.article.scores,
        style: state.style
    }
}

export default connect(mapStateToProps)(AnalysisCard);