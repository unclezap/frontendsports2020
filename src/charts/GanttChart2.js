import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'

let weeks = []
for (let i=0; i< 22; i++) {
  weeks.push(`Week ${i}`)
}
class GanttChart2 extends React.Component {
  state = {
    options: {
      tooltip: {
        enabled: true,
        formatter: function() {
          //
          return `Week ${this.point.team}`;
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
      series: []
    }
  };

  buildOptions = () => {
      console.log("hi")
      let dataArray = []
      this.props.analysis.batch.forEach(batch => {
        return batch.games.forEach(oneGame => {
          let resultTeam1 = {}
          let resultTeam2 = {}
          let team1 = oneGame.game[0]
          let team2 = oneGame.game[1]
          let team1Score = oneGame.team_1_actual_score
          let team2Score = oneGame.team_2_actual_score

          resultTeam1.name = team1
          resultTeam1.team = team1
          resultTeam1.id = team1.toLowerCase() + "_" + "results"
          resultTeam1.start = oneGame.week
          resultTeam1.milestone = true

          resultTeam2.name = team2
          resultTeam2.team = team2
          resultTeam2.id = team2.toLowerCase() + "_" + "results"
          resultTeam2.start = oneGame.week
          resultTeam2.milestone = true

          let margin = Math.abs(team1Score - team2Score)
          let opacity = 1
          if (margin <= 14) {
            opacity = 0.1 + (0.9 * (14 - margin)/14)  
          }
          resultTeam1.opacity = opacity
          resultTeam2.opacity = opacity

          if (team1Score > oneGame.team2Score) {
            resultTeam2.dependency = resultTeam1.id
            resultTeam1.color = 'rgb(0,0,255)'
            resultTeam2.color = 'rgb(0,0,0)'
          } else {
            resultTeam1.dependency = resultTeam2.id
            resultTeam1.color = 'rgb(0,0,0)'
            resultTeam2.color = 'rgb(0,0,255)'
          }

          dataArray.push(resultTeam1)
          dataArray.push(resultTeam2)
        })
      })
      let seriesObject = {}
      seriesObject.data = dataArray
      let seriesArray = [seriesObject]
      let madeOptions = Object.assign(this.state.options, {series: seriesArray})
      // return madeOptions
      // return seriesArray
      this.setState({options: madeOptions})
    // } else {
    //   return []
    // }

  }

  render() {
    return (
      <div>
        {this.props.analysis.loaded ?
        <div>
        {this.state.options.series === [] 
        ? <div>
            <HighchartsReact
            constructorType={"ganttChart"}
            highcharts={Highcharts}
            options={this.state.options}
            />
            {this.buildOptions()}
          </div>
        : <HighchartsReact
        constructorType={"ganttChart"}
        highcharts={Highcharts}
        options={this.state.options}
        />
        }</div>
        : <p>waiting to load</p>}
        
        {/* <Button onClick={this.buildChart}>Click Me!</Button> */}
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    analysis: state.analysis
  }
}

export default connect(mapStateToProps)(GanttChart2)