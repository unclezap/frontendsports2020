import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import { connect } from 'react-redux';
import ErrorBoundary from './ErrorBoundary'

class GanttChart2 extends React.Component {

  showChart = () => {
    return (
      <ErrorBoundary>
      <HighchartsReact
          constructorType={"ganttChart"}
          highcharts={Highcharts}
          options={this.props.options}
        />
      </ErrorBoundary>
    )
  }


  render() {
    return (
      <div>
        <p style={{fontSize: "large", background: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>Click on a week below to chart it!</p>
        <br></br>
        <p style={{background: "white", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>Diamond points represent real-life game results, with blue diamonds representing wins and black ones representing losses.  The opacity of the diamond represents the strength of the win or the depth of the loss.</p>
        <br></br>
        <p style={{background: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>Colored blocks represent ESPN's predictions.  Green blocks represent completely accurate W/L predictions.  Red blocks indicated ESPN was not correct in their W/L projections, and yellow blocks represent times where they prevaricated, giving two separate W/L predictions.</p>
        <br></br>
        <p style={{background: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>Arrows represent blowouts (margin >= 28 points), with the arrow pointing towards the game winner.</p>
        <br></br>
        <p style={{background: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>You can create alternate timelines by clicking on the "Change the past" buttons, making a timeline more like the one ESPN thought would happen.</p>
        
      { this.props.loaded ? this.showChart() : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
//loadedChecker not really performing up to snuff right now
  let loadedChecker = false

  let chartOptionsObjectMaker = (theData) =>  {

       if ( theData[0].data.map((row) => {
      if (Object.keys.length >= 8) {
          return row
        }
      }).length === theData[0].data.map((row) => {
      return row
    }).length) {
      loadedChecker = true
    }

    return {
      tooltip: {
        enabled: true,
        formatter: function() {
          return `${this.point.hoverOver}`;
        }
      },
      title: {
        text: '2019 Season'
      },
      xAxis: [{
        categories: weeks,
      }],
      yAxis: {
        uniqueNames: true,
      },
      series: theData
    }
  }
  
  let weeks = [""]
  for (let i=1; i< 18; i++) {
    weeks.push(` Wk ${i}`)
  }

    let dataArray = []
    state.analysis.batch.forEach(batch => {
      batch.games.forEach(oneGame => {
        let resultTeam1 = {}
        let resultTeam2 = {}
        let predTeam1 = {}
        let predTeam2 = {}
        let team1 = oneGame.game[0]
        let team2 = oneGame.game[1]
        let team1Score = oneGame.team_1_actual_score
        let team2Score = oneGame.team_2_actual_score
        let team1PredScore = (oneGame.team_1_score_predictions[0] + oneGame.team_1_score_predictions[1])/2
        let team2PredScore = (oneGame.team_2_score_predictions[0] + oneGame.team_2_score_predictions[1])/2

        resultTeam1.name = team1
        resultTeam1.team = team1
        resultTeam1.id = team1.toLowerCase() + "_" + "results" + `${oneGame.week}`
        resultTeam1.start = oneGame.week + Math.random()/20
        resultTeam1.end = 17
        resultTeam1.milestone = true

        resultTeam2.name = team2
        resultTeam2.team = team2
        resultTeam2.id = team2.toLowerCase() + "_" + "results" + "_" + `${oneGame.week}`
        resultTeam2.start = oneGame.week - Math.random()/20
        resultTeam2.end = 17
        resultTeam2.milestone = true

        predTeam1.name = team1
        predTeam1.team = team1
        predTeam1.id = team1.toLowerCase() + "_" + "preds" + `${oneGame.week}`
        predTeam1.start = oneGame.week - 0.5
        predTeam1.end = oneGame.week + 0.5

        predTeam2.name = team2
        predTeam2.team = team2
        predTeam2.id = team2.toLowerCase() + "_" + "preds" + `${oneGame.week}`
        predTeam2.start = oneGame.week - 0.5
        predTeam2.end = oneGame.week + 0.5

        resultTeam1.opacity = oneGame.opacity
        resultTeam2.opacity = oneGame.opacity
        predTeam1.opacity = oneGame.transparency/2 + 0.2
        predTeam2.opacity = oneGame.transparency/2 + 0.2

        if (team1Score > team2Score) {
          resultTeam1.color = 'rgb(0,0,255)'
          resultTeam2.color = 'rgb(0,0,0)'
          predTeam1.hoverOver = `${team1} ${team1Score} - ${team2} ${team2Score}` + '<br/>' + 'Win' + '<br/>'
          predTeam2.hoverOver = `${team2} ${team2Score} - ${team1} ${team1Score}` + '<br/>' + 'Loss' + '<br/>'
          if (Math.abs(team1Score - team2Score) >= 28) {
            resultTeam1.dependency = [resultTeam2.id]
            predTeam1.hoverOver += 'Blowout <br/>'
            predTeam2.hoverOver += 'Blowout <br>'
            } else {
              resultTeam1.dependency = ""
              resultTeam2.dependency = ""
            }
        } else {
          resultTeam1.color = 'rgb(0,0,0)'
          resultTeam2.color = 'rgb(0,0,255)'
          predTeam1.hoverOver = `${team1} ${team1Score} - ${team2} ${team2Score}` + '<br/>' + 'Loss' + '<br/>'
          predTeam2.hoverOver = `${team2} ${team2Score} - ${team1} ${team1Score}` + '<br/>' + 'Win' + '<br/>'
          if (Math.abs(team1Score - team2Score) >= 28 ) {
            resultTeam2.dependency = [resultTeam1.id]
            predTeam1.hoverOver += 'Blowout <br>'
            predTeam2.hoverOver += 'Blowout <br>'
            } else {
              resultTeam1.dependency = ""
              resultTeam2.dependency = ""
            }
        }

        if (oneGame.correct === 2) {
          predTeam1.color = 'rgb(0,181,0)'
          predTeam2.color = 'rgb(0,181,0)'
          predTeam1.hoverOver += `ESPN got 2 correct! Predicted outcome was ${team1} ${team1PredScore} - ${team2} ${team2PredScore}.`
          predTeam2.hoverOver += `ESPN got 2 correct! Predicted outcome was ${team2} ${team2PredScore} - ${team1} ${team1PredScore}.`
        } else if (oneGame.correct === 1) {
          predTeam1.color = 'rgb(255,229,0)'
          predTeam2.color = 'rgb(255,229,0)'
          predTeam1.hoverOver += `ESPN got 1 correct! Predicted outcome was ${team1} ${team1PredScore} - ${team2} ${team2PredScore}.`
          predTeam2.hoverOver += `ESPN got 1 correct! Predicted outcome was ${team2} ${team2PredScore} - ${team1} ${team1PredScore}.`
        } else {
          predTeam1.color = 'rgb(230,0,0)'
          predTeam2.color = 'rgb(230,0,0)'
          predTeam1.hoverOver += `ESPN got 0 correct. Predicted outcome was ${team1} ${team1PredScore} - ${team2} ${team2PredScore}.`
          predTeam2.hoverOver += `ESPN got 0 correct. Predicted outcome was ${team2} ${team2PredScore} - ${team1} ${team1PredScore}.`
        }

        if (oneGame.opacity === 0) {
          predTeam1.opacity = 0
          predTeam2.opacity = 0
          predTeam1.hoverOver = "Dinasours are the best!"
          predTeam2.hoverOver = "Dinasours RAAWR"
        }



        dataArray.push(resultTeam1)
        dataArray.push(resultTeam2)
        dataArray.push(predTeam1)
        dataArray.push(predTeam2)
      })
    })

    let seriesObject = {}
    seriesObject.data = dataArray
    let seriesArray = [seriesObject]

    let chartOptionsObject = chartOptionsObjectMaker(seriesArray)

  return {
    options: chartOptionsObject,
    loaded: loadedChecker
  }
}

export default connect(mapStateToProps)(GanttChart2)

