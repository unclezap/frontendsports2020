import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import { connect } from 'react-redux';
import ErrorBoundary from './ErrorBoundary'

let weeks = []
for (let i=0; i< 22; i++) {
  weeks.push(`Wk ${i}`)
}

class GanttChart2 extends React.Component {
  state = {
    options: {
      tooltip: {
        enabled: true,
        formatter: function() {
          //
          return `${this.point.hoverOver}`;
        }
      },
      title: {
        //
        text: '2019 Season'
      },
      xAxis: [{
        categories: weeks,
      }],
      yAxis: {
        uniqueNames: true,
      },
      series: {
        name: "New England Patriots Results",
        team: "Patriots",
        id: "patriots_results",
        dependency: "",
        opacity: 1.0,
        color: 'rgb(0,0,255)',
        start: 1,
        milestone: true
      }
    }
  };

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
      { this.showChart() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  
  let weeks = []
  for (let i=0; i< 22; i++) {
    weeks.push(`Wk ${i}`)
  }

  // let order = ["Patriots", "Bills", "Jets", "Dolphins", "Ravens", "Steelers", "Browns", "Bengals", "Texans", "Titans", "Colts", "Jaguars", "Chiefs", "Broncos", "Raiders", "Chargers", "Eagles", "Cowboys", "Giants", "Washington", "Packers", "Vikings", "Bears", "Lions", "Saints", "Falcons", "Buccaneers", "Panthers", "49ers", "Seahawks", "Rams", "Cardinals"];

    let dataArray = []
    state.analysis.batch.forEach(batch => {
      batch.games.forEach(oneGame => {
        let resultTeam1 = {}
        let resultTeam2 = {}
        let team1 = oneGame.game[0]
        let team2 = oneGame.game[1]
        let team1Score = oneGame.team_1_actual_score
        let team2Score = oneGame.team_2_actual_score

        resultTeam1.name = team1
        resultTeam1.team = team1
        resultTeam1.id = team1.toLowerCase() + "_" + "results" + `${oneGame.week}`
        resultTeam1.start = oneGame.week
        resultTeam1.end = 21
        resultTeam1.milestone = true

        resultTeam2.name = team2
        resultTeam2.team = team2
        resultTeam2.id = team2.toLowerCase() + "_" + "results" + "_" + `${oneGame.week}`
        resultTeam2.start = oneGame.week
        resultTeam2.end = 21
        resultTeam2.milestone = true

        let margin = Math.abs(team1Score - team2Score)
        // let opacity = 1
        // if (margin <= 14) {
        //   opacity = 1 - (0.9 * (14 - margin)/14)  
        // }
        resultTeam1.opacity = oneGame.opacity
        resultTeam2.opacity = oneGame.opacity
        
        if (team1Score > team2Score) {
          // resultTeam1.dependency = [resultTeam2.id]
          // resultTeam2.dependency = resultTeam1.id
          resultTeam1.color = 'rgb(0,0,255)'
          resultTeam2.color = 'rgb(0,0,0)'
          resultTeam1.hoverOver = `${team1} ${team1Score} - ${team2} ${team2Score}` + '<br/>' + 'Win'
          resultTeam2.hoverOver = `${team1} ${team1Score} - ${team2} ${team2Score}` + '<br/>' + 'Loss'
        } else {
          // resultTeam2.dependency = [resultTeam1.id]
          // resultTeam1.dependency = resultTeam2.id
          resultTeam1.color = 'rgb(0,0,0)'
          resultTeam2.color = 'rgb(0,0,255)'
          resultTeam1.hoverOver = `${team2} ${team2Score} - ${team1} ${team1Score}` + '<br/>' + 'Loss'
          resultTeam2.hoverOver = `${team2} ${team2Score} - ${team1} ${team1Score}` + '<br/>' + 'Win'
        }

        dataArray.push(resultTeam1)
        dataArray.push(resultTeam2)
      })
    })

    let seriesObject = {}
    seriesObject.data = dataArray
    let seriesArray = [seriesObject]
    let chartOptionsObject =  {
      tooltip: {
        enabled: true,
        formatter: function() {
          //
          return `${this.point.hoverOver}`;
        }
      },
      title: {
        //
        text: '2019 Season'
      },
      xAxis: [{
        categories: weeks,
      }],
      yAxis: {
        uniqueNames: true,
      },
      series: seriesArray
    }

  return {
    options: chartOptionsObject
  }
}

export default connect(mapStateToProps)(GanttChart2)

