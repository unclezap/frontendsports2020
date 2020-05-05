import React from 'react'
import { Col, Row } from 'react-bootstrap'
import GameCard from './GameCard'
// import { connect } from 'react-redux'
// import { addCorrect } from '../redux'

class MakeAnalysis extends React.Component {

    makeAnalysis = () => {
        let games = []
            let checked_teams = []
            this.props.predictions.forEach((prediction) => {
                    if (!checked_teams.includes(prediction.team_a))  {
                        checked_teams.push(prediction.team_a)
                        checked_teams.push(prediction.team_b)
                        games.push([prediction.team_a,prediction.team_b]) 
                    }
                })

        // console.log(games)
        // debugger;
    
        return <Row>{this.makeGameCards(games, this.props.predictions, this.props.scores)}</Row>
    }
    
    makeGameCards = (games, predictions, scores) => {
        return games.map((game, index) => {
            let team_1_score_predictions = []
            let team_2_score_predictions = []
            let team_1_actual_score
            let team_2_actual_score
    
            //for each game, check for predictions
            //example game: [saints, hawks]
            
            predictions.forEach((prediction) => {
            
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
    
            for (let i=0;i < scores.length; i++) {
                if (scores[i].team.includes(game[0])) {
                    team_1_actual_score = scores[i].points
                    i = 1000     
                }
            }
    
            for (let i=0;i < scores.length; i++) {
                if (scores[i].team.includes(game[1])) {
                    team_2_actual_score = scores[i].points
                    i = 1000        
                }
            }
    
            let espn1 = 0
            let espn2 = 0
            let correct = 0
            let incorrect = 0
            let color = "white"
    
            switch (team_1_score_predictions[0] > team_2_score_predictions[0]) {
                case true:
                    espn1++
                    break;
                case false:
                    espn2++
                    break;
                default:
                    break;
            }
    
            switch (team_1_score_predictions[1] > team_2_score_predictions[1]) {
                case true:
                    espn1++
                    break;
                case false:
                    espn2++
                    break;
                default:
                    break;
            }
    
            switch (team_1_actual_score > team_2_actual_score) {
                case true:
                    correct = espn1
                    incorrect = espn2
                    break;
                case false:
                    correct = espn2
                    incorrect = espn1
                    break;
                default:
                    break;
            }
    
            switch (correct) {
                case 2:
                    color = "green"
                    break;
                case 1:
                    color = "yellow"
                    break
                default:
                    color = "red"
            }
    
            return (
                <Col key={index}>
                    <GameCard
                    game={game}
                    team_1_score_predictions={team_1_score_predictions}
                    team_2_score_predictions={team_2_score_predictions}
                    team_1_actual_score={team_1_actual_score}
                    team_2_actual_score={team_2_actual_score}
                    correct={correct}
                    incorrect={incorrect}
                    color={color}
                    />
                </Col>
            )
        })
    }

    render () {
        return <div>{this.makeAnalysis()}</div>
    }
}

export default MakeAnalysis