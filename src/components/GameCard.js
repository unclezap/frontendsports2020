import React from 'react';
import { Card } from 'react-bootstrap';

class ScoreCard extends React.Component {

    render () {
        return (
            <Card style={{ width: '18rem' }} className="text-center">
                <h5>{`Predictions for ${this.props.game[0]}-${this.props.game[1]}`}</h5>
                <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[0]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[0]}`}</p>
                <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[1]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[1]}`}</p>
                <h7>{`Actual score: ${this.props.game[0]}: ${this.props.team_1_actual_score}, ${this.props.game[1]}: ${this.props.team_2_actual_score}`}</h7>
            </Card>
        )
    }

}

export default ScoreCard