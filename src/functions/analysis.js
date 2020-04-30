    import React from 'react';
    import { Col, Row } from 'react-bootstrap'
    import GameCard from '../components/GameCard';

    export const makeAnalysis = (predictions, scores) => {
        let games = []
            let checked_teams = []
            predictions.forEach((prediction) => {
                    if (!checked_teams.includes(prediction.team_a))  {
                        checked_teams.push(prediction.team_a)
                        checked_teams.push(prediction.team_b)
                        games.push([prediction.team_a,prediction.team_b]) 
                    }
                })

        return <Row>{makeGameCards(games, predictions, scores)}</Row>
    }

    function makeGameCards (games, predictions, scores) {
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

            return (
                <Col key={index}>
                <GameCard
                game={game} team_1_score_predictions={team_1_score_predictions} team_2_score_predictions={team_2_score_predictions} team_1_actual_score={team_1_actual_score} team_2_actual_score={team_2_actual_score} />
                </Col>
            )
        })
    }
