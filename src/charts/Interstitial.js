import React from 'react';
import GanttChart2 from './GanttChart2';
import { connect } from 'react-redux';
import { doneLoading } from '../redux';

class Interstitial extends React.Component{

    state = {
        done: false
    }

    buildChart = () => {
        console.log("build")
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
          console.log(seriesArray)
          this.setState({series: seriesArray, done: true})

      }

    launchChart = () => {
        // this.props.onDoneLoading()
        return <div><GanttChart2 series={this.state.series}/></div>
    }

    render () {
        return (
            <div>
                {this.props.analysis.loaded && !this.state.done ? this.buildChart(): <h2>loading....</h2>}
                {this.state.done ? this.launchChart():<h2>still loading...</h2>}
            </div>
        )
    }
}


// const mapStateToProps = state => {
//     return {
//       analysis: state.analysis
//     }
//   }


export default Interstitial
  // export default connect(mapStateToProps)(Interstitial)