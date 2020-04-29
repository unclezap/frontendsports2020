import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card';

class AnalysisCard extends React.Component {

    // const {batch} = this.props.batch
    // makeCard = () => {
    //     return <p>{this.props.batch.name}</p>
    // }
    makeAnalysisCard = () => {
            let games = []
            let checked_teams = []
            console.log(this.props.predictions)
            this.props.predictions.forEach((prediction) => {
                    if (!checked_teams.includes(prediction.team_a))  {
                        checked_teams.push(prediction.team_a)
                        checked_teams.push(prediction.team_b)
                        games.push([prediction.team_a,prediction.team_b]) 
                    }
                })

            return games.map((game) => {
                let team_1_score_predictions = []
                let team_2_score_predictions = []
                let team_1_actual_score
                let team_2_actual_score

                //for each game, check for predictions
                //example game: [saints, hawks ]
                
                this.props.predictions.forEach((prediction) => {
                
                //the possibilities: 
                // [team_a: saints, team_b: hawks]
                // [team_a: hawks, team_b: saints]
                // [team_b: cowboys, team_b: pats] (don't push anything in)
                
                    if (prediction.team_a.includes(game[0])) {
                      team_1_score_predictions.push(prediction.team_a_score)
                      team_2_score_predictions.push(prediction.team_b_score)
                  } else if (prediction.team_a.includes(game[1])) {
                      team_1_score_predictions.push(prediction.team_b_score)
                      team_2_score_predictions.push(prediction.team_a_score)
                  }
                })

                //find the actual score for this game
                // console.log("props", this.props.scores)

                for (let i=0;i < this.props.scores.length; i++) {
                    console.log("score", this.props.scores[i].team)
                    console.log("game", game[0])
                    if (this.props.scores[i].team.includes(game[0])) {
                        team_1_actual_score = this.props.scores[i].points
                        i = 1000     
                    }
                }

                for (let i=0;i < this.props.scores.length; i++) {
                    if (this.props.scores[i].team.includes(game[1])) {
                        team_2_actual_score = this.props.scores[i].points
                        i = 1000        
                    }
                }

                return (
                    <div>
                        <h5>{`Predictions for ${game[0]}-${game[1]}`}</h5>
                        <p>{`${game[0]}: ${team_1_score_predictions[0]}, ${game[1]}: ${team_2_score_predictions[0]}`}</p>
                        <p>{`${game[0]}: ${team_1_score_predictions[1]}, ${game[1]}: ${team_2_score_predictions[1]}`}</p>
                        <h7>{`Actual score: ${game[0]}: ${team_1_actual_score}, ${game[1]}: ${team_2_actual_score}`}</h7>
                    </div>
                )
            })
    }

    render () {
        return (

            <Card style={{ backgroundImage: this.props.style.backgroundImage4, width: '100rem', height: '50rem' }} className="text-center">
                {this.props.batch !== undefined ? <Card.Title>{this.props.batch.name}</Card.Title> : null}
                {this.props.predictions !== undefined && this.props.predictions.length > 0 ? this.makeAnalysisCard(): <h1>loading...</h1>}
                
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