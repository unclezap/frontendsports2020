import React from 'react';
import { Card } from 'react-bootstrap';

class ScoreCard extends React.Component {

    state = {
        clicked: false,
        height: "3rem",
        color: "white"
    }
    

    handleClick = () => {
        this.setState(prev => {
            let newHeight
            if (prev.height === "3rem") {
                newHeight = "13rem"
            } else {
                newHeight = "3rem"
            }
            return {clicked: !prev.clicked, height: newHeight}
        })
    }

    twoCorrect = () => {
        return <div><p>Espn got 100% correct!</p></div>
    }

    oneCorrect = () => {
        return <div><p>Espn got 50% correct!</p></div>
    }

    zeroCorrect = () => {
        return <div><p>Espn got 0% correct! :(</p></div>
    }

    teamAWins () {
        if (this.props.team_1_score_predictions[0] > this.props.team_2_score_predictions[0]) {
            if (this.props.team_1_score_predictions[1] > this.props.team_2_score_predictions[1]) {
                return this.twoCorrect()
            } else {
                return this.oneCorrect()
            }
        } else {
            if (this.props.team_1_score_predictions[1] > this.props.team_2_score_predictions[1]) {
                return this.oneCorrect()
            } else {
                return this.zeroCorrect()
            }
        }

    }

    teamBWins () {
        if (this.props.team_1_score_predictions[0] > this.props.team_2_score_predictions[0]) {
            if (this.props.team_1_score_predictions[1] > this.props.team_2_score_predictions[1]) {
                return this.zeroCorrect()
            } else {
                return this.oneCorrect()
            }
        } else {
            if (this.props.team_1_score_predictions[1] > this.props.team_2_score_predictions[1]) {
                return this.oneCorrect()
            } else {
                return this.twoCorrect()
            }
        }

    }

    render () {

        return (
            <Card
                onClick={this.handleClick}
                className="text-center"
                style={{ 
                    background: this.props.color,
                    width: '18rem',
                    height: this.state.height
                }}
            >
                <h5>{`Predictions for ${this.props.game[0]}-${this.props.game[1]}`}</h5>
                {this.state.clicked ?
                    <div>
                        <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[0]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[0]}`}</p>
                        <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[1]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[1]}`}</p>
                        <h6><strong>{`Actual score: ${this.props.game[0]}: ${this.props.team_1_actual_score}, ${this.props.game[1]}: ${this.props.team_2_actual_score}`}</strong></h6>
                        {/* {this.props.team_1_actual_score > this.props.team_2_actual_score ? this.teamAWins() : this.teamBWins()}  */}
                        <p>{`Espn got ${this.props.correct} correct!`}</p>
                    </div>
                : null}
            </Card>
        )
    }

}

export default ScoreCard;