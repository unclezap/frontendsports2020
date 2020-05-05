import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addCorrect } from '../redux'

class GameCard extends React.Component {

    state = {
        clicked: false,
        height: "3rem",
        color: this.props.color,
        removed: false
    }

    componentDidMount () {
        this.props.onAddCorrect(this.props.correct, this.props.incorrect, this.props.errorMargin, this.props.batchId)
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
        let subtract = -1 * this.props.correct
        let removeErrorMargin = -1 * this.props.errorMargin
        this.props.onAddCorrect(subtract, this.props.correct, removeErrorMargin, this.props.batchId)
        this.setState({
            clicked: false,
            height: "3rem",
            color: "grey",
            removed: true
        })
    }

    restoreAnalysis = () => {
        let subtract = -1 * this.props.correct
        this.props.onAddCorrect(this.props.correct, subtract, this.props.errorMargin, this.props.batchId)
        this.setState({
            color: this.props.color,
            removed: false
        })
    }

    render () {

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
                    <h5>{`Predictions for ${this.props.game[0]}-${this.props.game[1]}`}</h5>
                    {this.state.clicked ?
                        <div>
                            <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[0]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[0]}`}</p>
                            <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[1]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[1]}`}</p>
                            <h6><strong>{`Actual score: ${this.props.game[0]}: ${this.props.team_1_actual_score}, ${this.props.game[1]}: ${this.props.team_2_actual_score}`}</strong></h6>
                            <p>{`Espn got ${this.props.correct} correct!`}</p>
                            
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
       onAddCorrect: (correct, incorrect, errorMargin, batchId) => dispatch(addCorrect(correct, incorrect, errorMargin, batchId)) 
    }
}

export default connect(null, mapDispatchToProps)(GameCard)