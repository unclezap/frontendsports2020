import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addCorrect } from '../redux'

class ScoreCard extends React.Component {

    state = {
        clicked: false,
        height: "3rem",
        color: "white"
    }

    componentDidMount () {
        this.props.onAddCorrect(this.props.correct, this.props.incorrect)
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

    removeAnalysis = () => {
        console.log("hit remove")
        let subtract = -1 * this.props.correct
        this.props.onAddCorrect(subtract)
    }

    render () {

        return (
            <div>
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
                {this.state.clicked ? <button type="submit" onClick={this.removeAnalysis} >Remove this analysis!</button> : null}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
       onAddCorrect: (correct, incorrect) => dispatch(addCorrect(correct, incorrect)) 
    }
}

export default connect(null, mapDispatchToProps)(ScoreCard)

// export default ScoreCard;