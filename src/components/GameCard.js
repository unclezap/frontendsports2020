import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addCorrect } from '../redux'
import { removeCorrect } from '../redux'
import { changeThePast } from '../redux'
import { restoreThePast } from '../redux'

class GameCard extends React.Component {

    state = {
        clicked: false,
        // height: "3rem",
        color: this.props.thisGame.color,
        removed: false,
        dispatched: false,
        changedPast: false,
        
        correct: this.props.thisGame.correct,
        incorrect: this.props.thisGame.incorrect,
        errorMargin: this.props.thisGame.errorMargin,
        team_1_actual_score: this.props.thisGame.team_1_actual_score,
        team_2_actual_score: this.props.thisGame.team_2_actual_score
    }

    componentDidMount () {
        this.props.onAddCorrect(this.props.thisGame.correct, this.props.thisGame.incorrect, this.props.thisGame.errorMargin, this.props.thisGame.batchId, this.props.thisGame)
    }

    handleClick = (event) => {
        if (event.target.innerText !== "Change the past" && event.innerText !== "Restore the past") {
            this.setState(prev => {
                let newHeight
                // if (prev.height === "3rem") {
                    // newHeight = "19rem"
                // } else {
                    // newHeight = "3rem"
                // }
                // return {clicked: !prev.clicked, height: newHeight}
                return {clicked: !prev.clicked}
            })
        }
    }

    removeAnalysis = () => {
        let subtract = -1 * this.props.thisGame.correct
        let removeErrorMargin = -1 * this.props.thisGame.errorMargin
        this.props.onRemoveCorrect(subtract, this.props.thisGame.correct, removeErrorMargin, this.props.thisGame.batchId, this.props.thisGame, true)
        this.setState({
            clicked: false,
            // height: "3rem",
            color: "grey",
            removed: true
        })
    }

    restoreAnalysis = () => {
        let subtract = -1 * this.props.thisGame.correct
        this.props.onAddCorrect(this.props.thisGame.correct, subtract, this.props.thisGame.errorMargin, this.props.thisGame.batchId, this.props.thisGame, true)
        this.setState({
            color: this.props.thisGame.color,
            removed: false
        })
    }

    changeThePast = (event) => {
        if (event.target.innerText === "Change the past") {
        
            let newGame = {}
            newGame.batchId = this.props.thisGame.batchId
            newGame.color = 'rgba(0,181,0,1)'
            newGame.errorMargin = 0
            newGame.game = this.props.thisGame.game
            newGame.correct = 2
            newGame.incorrect = 0
            newGame.opacity = 1
            newGame.team_1_actual_score = Math.round((this.props.thisGame.team_1_score_predictions[0] + this.props.thisGame.team_1_score_predictions[1])/2)
            newGame.team_2_actual_score = Math.round((this.props.thisGame.team_2_score_predictions[0] + this.props.thisGame.team_2_score_predictions[1])/2)
            newGame.team_1_score_predictions = this.props.thisGame.team_1_score_predictions
            newGame.team_2_score_predictions = this.props.thisGame.team_2_score_predictions
            newGame.transparency= 1.0
            newGame.week = this.props.thisGame.week
            newGame.oldGame = this.props.thisGame

            let add = 2 - this.props.thisGame.correct
            let subtract = -1 * this.props.thisGame.incorrect
            let removeErrorMargin = -1 * this.props.thisGame.errorMargin

            this.props.onChangeThePast(add, subtract, removeErrorMargin, this.props.thisGame.batchId, newGame, true)
            this.setState({
                correct: 2,
                incorrect: 0,
                errorMargin: 0,
                team_1_actual_score: Math.round((this.props.thisGame.team_1_score_predictions[0] + this.props.thisGame.team_1_score_predictions[1])/2),
                team_2_actual_score: Math.round((this.props.thisGame.team_2_score_predictions[0] + this.props.thisGame.team_2_score_predictions[1])/2),
                color: 'rgba(0,181,0,1)',
                changedPast: true
            })
        }
    }

    restoreThePast = (event) => {
        if (event.target.innerText === "Restore the past") {
            let subtract = -1 * (2 - this.props.thisGame.correct)
            let add = this.props.thisGame.incorrect
            let removeErrorMargin = this.props.thisGame.errorMargin
            this.props.onChangeThePast(subtract, add, removeErrorMargin, this.props.thisGame.batchId,this.props.thisGame, true)
            this.setState({
                correct: this.props.thisGame.correct,
                incorrect: this.props.thisGame.incorrect,
                errorMargin: this.props.thisGame.errorMargin,
                team_1_actual_score: this.props.thisGame.team_1_actual_score,
                team_2_actual_score: this.props.thisGame.team_2_actual_score,
                color: this.props.thisGame.color,
                changedPast: false
            })
        }
    }

    //when clicked, add a margin property around the div
    //should get the div to expand with it
    //margin-bottom

    //bootstrap has some rules about how this works
    //flexbox system - each box has a # of rows and columns
    //float property
    //float left or right
    //also a clear property (clear left/right/both)

    render () {

        return (
            <div>
                <Card
                    onClick={(event) => this.handleClick(event)}
                    className="text-center"
                    style={{ 
                        background: this.state.color,
                        width: '18rem',
                        // height: this.state.height
                        display: "flex"
                    }}
                >
                    <h5>{`Predictions for ${this.props.thisGame.game[0]}-${this.props.thisGame.game[1]}`}</h5>
                    {this.state.clicked ?
                        <div>
                            <p>{`${this.props.thisGame.game[0]}: ${this.props.thisGame.team_1_score_predictions[0]}, ${this.props.thisGame.game[1]}: ${this.props.thisGame.team_2_score_predictions[0]}`}</p>
                            <p>{`${this.props.thisGame.game[0]}: ${this.props.thisGame.team_1_score_predictions[1]}, ${this.props.thisGame.game[1]}: ${this.props.thisGame.team_2_score_predictions[1]}`}</p>
                            <h6><strong>{`Actual score: ${this.props.thisGame.game[0]}: ${this.state.team_1_actual_score}, ${this.props.thisGame.game[1]}: ${this.state.team_2_actual_score}`}</strong></h6>
                            <p>{`Espn got ${this.state.correct} correct!`}</p>
                            <p>{`The average error for predicted game margin was `}<b>{`${this.state.errorMargin/2}.`}</b></p>
                            {!this.state.changedPast && !this.state.removed ? <button onClick={(event) => this.changeThePast(event)} className="button">Change the past</button> : null}
                            {this.state.changedPast ? <button onClick={(event) => this.restoreThePast(event)}>Restore the past</button>: null}
                        </div>
                    : null}
                </Card>
                {this.state.clicked && !this.state.removed && !this.state.changedPast ? <button type="submit" onClick={this.removeAnalysis} >Remove this analysis!</button> : null}
                {this.state.clicked && this.state.removed && !this.state.changedPast? <button type="submit" onClick={this.restoreAnalysis} >Return this analysis!</button> : null}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
       onAddCorrect: (correct, incorrect, errorMargin, batchId, thisGame, remove) => dispatch(addCorrect(correct, incorrect, errorMargin, batchId, thisGame, remove)),
       onRemoveCorrect: (correct, incorrect, errorMargin, batchId, thisGame, remove) => dispatch(removeCorrect(correct, incorrect, errorMargin, batchId, thisGame, remove)),
       onChangeThePast: (correct, incorrect, errorMargin, batchId, thisGame, remove) => dispatch(changeThePast(correct, incorrect, errorMargin, batchId, thisGame, remove)),
       onRestoreThePast: (correct, incorrect, errorMargin, batchId, thisGame, remove) => dispatch(restoreThePast(correct, incorrect, errorMargin, batchId, thisGame, remove))
    }
}

export default connect(null, mapDispatchToProps)(GameCard)