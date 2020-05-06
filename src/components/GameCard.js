import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addCorrect } from '../redux'
import { removeCorrect } from '../redux'

class GameCard extends React.Component {

    state = {
        clicked: false,
        height: "3rem",
        color: this.props.thisGame.color,
        removed: false,
        dispatched: false
    }

    componentDidMount () {
        this.props.onAddCorrect(this.props.thisGame.correct, this.props.thisGame.incorrect, this.props.thisGame.errorMargin, this.props.thisGame.batchId, this.props.thisGame)
    }

    handleClick = () => {
        this.setState(prev => {
            let newHeight
            if (prev.height === "3rem") {
                newHeight = "15rem"
            } else {
                newHeight = "3rem"
            }
            return {clicked: !prev.clicked, height: newHeight}
        })
    }

    removeAnalysis = () => {
        let subtract = -1 * this.props.thisGame.correct
        let removeErrorMargin = -1 * this.props.thisGame.errorMargin
        console.log("removeAnalysis")
        this.props.onRemoveCorrect(subtract, this.props.thisGame.correct, removeErrorMargin, this.props.thisGame.batchId, this.props.thisGame)
        this.setState({
            clicked: false,
            height: "3rem",
            color: "grey",
            removed: true
        })
    }

    restoreAnalysis = () => {
        let subtract = -1 * this.props.thisGame.correct
        this.props.onAddCorrect(this.props.thisGame.correct, subtract, this.props.thisGame.errorMargin, this.props.thisGame.batchId, this.props.thisGame)
        this.setState({
            color: this.props.thisGame.color,
            removed: false
        })
    }

    //when clicked, add a margin property around the div
    //should get the div to expand with it
    //margin-bottom

    //bootstrap has some rules about how this works
    //flexbox system - each box has a # of rows and columns
    //float property
    //float left or right
    //also a clear property (clear left/right/both)

    // sendDate = () => {
    //     this.props.onAddCorrect(this.props.thisGame.correct, this.props.thisGame.incorrect, this.props.thisGame.errorMargin, this.props.thisGame.batchId, this.props.thisGame)
    //     this.setState({dispatched: true})
    // }

    render () {

        // if (!this.state.dispatched) {
            // this.sendDate()
        // }

        return (
            <div>
                <Card
                    onClick={this.handleClick}
                    className="text-center"
                    style={{ 
                        background: this.state.color,
                        width: '18rem',
                        height: this.state.height
                    }}
                >
                    <h5>{`Predictions for ${this.props.thisGame.game[0]}-${this.props.thisGame.game[1]}`}</h5>
                    {this.state.clicked ?
                        <div>
                            <p>{`${this.props.thisGame.game[0]}: ${this.props.thisGame.team_1_score_predictions[0]}, ${this.props.thisGame.game[1]}: ${this.props.thisGame.team_2_score_predictions[0]}`}</p>
                            <p>{`${this.props.thisGame.game[0]}: ${this.props.thisGame.team_1_score_predictions[1]}, ${this.props.thisGame.game[1]}: ${this.props.thisGame.team_2_score_predictions[1]}`}</p>
                            <h6><strong>{`Actual score: ${this.props.thisGame.game[0]}: ${this.props.thisGame.team_1_actual_score}, ${this.props.thisGame.game[1]}: ${this.props.thisGame.team_2_actual_score}`}</strong></h6>
                            <p>{`Espn got ${this.props.thisGame.correct} correct!`}</p>
                            <p>{`The average error for predicted game margin was `}<b>{`${this.props.thisGame.errorMargin/2}.`}</b></p>
                        </div>
                    : null}
                </Card>
                {this.state.clicked && !this.state.removed ? <button type="submit" onClick={this.removeAnalysis} >Remove this analysis!</button> : null}
                {this.state.clicked && this.state.removed ? <button type="submit" onClick={this.restoreAnalysis} >Return this analysis!</button> : null}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
       onAddCorrect: (correct, incorrect, errorMargin, batchId, thisGame) => dispatch(addCorrect(correct, incorrect, errorMargin, batchId, thisGame)),
       onRemoveCorrect: (correct, incorrect, errorMargin, batchId, thisGame) => dispatch(removeCorrect(correct, incorrect, errorMargin, batchId, thisGame, true))
    }
}

export default connect(null, mapDispatchToProps)(GameCard)