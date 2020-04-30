import React from 'react';
import { Card } from 'react-bootstrap';

class ScoreCard extends React.Component {

    // state = {
    //     espn1: 0,
    //     espn2: 0,
    //     correct: -1
    // }

    // onComponentDidMount () {
    //     // this.giveReport()
    //     console.log('mount')
    // }

    // giveReport = () => {
    //     console.log("give")
    //     this.calculateCorrect()

        
    // }

    // calculateCorrect = () => {
    //     // let prediction_hash = {espn1: 0, espn2: 0}
    //     console.log("calculate")
    //     this.calculateWhoPredictedToWin(0, 1)
        // prediction_hash = this.calculateWhoPredictedToWin(1, prediction_hash)

        // console.log(prediction_hash)
        // console.log(prediction_hash.espn1)

        // let correct
        // switch (this.props.team_1_actual_score > this.props.team_2_actual_score) {
        //     case true: 
        //         correct = prediction_hash.espn1
        //         return correct
        //     case false:
        //         correct = prediction_hash.espn2
        //         return correct
        //     default:
        //         correct = 0
        //         return correct
        // }
        
        // return prediction_hash.espn1
    // }

    // calculateWhoPredictedToWin = (analyst, count) => {

        // console.log("hi")
        // // console.log("calculate",prediction_hash)
        // if (count < 3) {
        //     switch(this.props.team_1_score_predictions[analyst] > this.props.team_2_score_predictions[analyst]) {
        //         case true:
        //             this.setState((prev) => ({espn1: prev.espn1++}, () => this.calculateWhoPredictedToWin(1, count++)))
        //             // prediction_hash.espn1++
        //             // return prediction_hash.espn1
        //             break;
        //         case false:
        //             this.setState((prev) => ({espn2: prev.espn2++}, () => this.calculateWhoPredictedToWin(1, count++)))
        //             // prediction_hash.espn2++
        //             // return prediction_hash.espn2
        //             break;
        //         default:
        //             break;
        //     }
        // } else {
        //     switch (this.props.team_1_actual_score > this.props.team_2_actual_score) {
        //             case true: 
        //             this.setState((prev) => ({correct: prev.espn1})) 
        //             // return <div><p>{`Espn got ${this.state.espn1} predictions correct!`}</p></div>
        //             break;
        //                 // return correct
        //             case false:
        //                 this.setState((prev) => ({correct: prev.espn2})) 
        //                 // return <div><p>{`Espn got ${this.state.espn2} predictions correct!`}</p></div>
        //                 break;
        //                 // return 
        //             default:
        //                 this.setState((prev) => ({correct: 0})) 
        //                 // return <div><p>{`Espn got 0 predictions correct!`}</p></div>
        //                 break;
        //                 // correct = 0
        //                 // return correct
        // }

//     }

// }

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
            <Card style={{ width: '18rem' }} className="text-center">
                <h5>{`Predictions for ${this.props.game[0]}-${this.props.game[1]}`}</h5>
                <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[0]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[0]}`}</p>
                <p>{`${this.props.game[0]}: ${this.props.team_1_score_predictions[1]}, ${this.props.game[1]}: ${this.props.team_2_score_predictions[1]}`}</p>
                <h6><strong>{`Actual score: ${this.props.game[0]}: ${this.props.team_1_actual_score}, ${this.props.game[1]}: ${this.props.team_2_actual_score}`}</strong></h6>
                {this.props.team_1_actual_score > this.props.team_2_actual_score ? this.teamAWins() : this.teamBWins()}
            </Card>
        )
    }

}

export default ScoreCard; 

// if (this.props.team_1_actual_score !== undefined) {
//     this.giveReport()
// }

                {/* {this.props.team_1_actual_score !== undefined && this.state.correct > -1 ? <p>{`Espn got ${this.state.correct} predictions correct!`}</p> : <div>{this.giveReport}</div>} */}