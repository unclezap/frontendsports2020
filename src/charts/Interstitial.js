import React from 'react';
import GanttChart2 from './GanttChart2';
import { connect } from 'react-redux';
import { doneLoading } from '../redux';

let weeks = []
for (let i=0; i< 22; i++) {
  weeks.push(`Week ${i}`)
}

const testoptions = {
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
              series: []
        
            }

class Interstitial extends React.Component{
  constructor(props) {
    super(props)


    // state = {

    //         options: {
    //           tooltip: {
    //             enabled: true,
    //             formatter: function() {
    //               //
    //               return `${this.point.hoverOver}`;
    //             }
    //           },
    //           title: {
    //             //
    //             text: '2019 Season'
    //           },
    //           xAxis: [{
    //             categories: weeks,
    //           }],
    //           yAxis: {
    //             uniqueNames: true,
    //           },
    //           series: []
        
    //         },
    //     done: false
    // }

    const buildChart = () => {
        // console.log("build")
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
      
              if (team1Score > team2Score) {
                resultTeam2.dependency = resultTeam1.id
                resultTeam1.color = 'rgb(0,0,255)'
                resultTeam2.color = 'rgb(0,0,0)'
                resultTeam1.hoverOver = `${team1} ${team1Score} - ${team2} ${team2Score}` + '<br/>' + 'Win'
                resultTeam2.hoverOver = `${team1} ${team1Score} - ${team2} ${team2Score}` + '<br/>' + 'Loss'
              } else {
                resultTeam1.dependency = resultTeam2.id
                resultTeam1.color = 'rgb(0,0,0)'
                resultTeam2.color = 'rgb(0,0,255)'
                resultTeam1.hoverOver = `${team2} ${team2Score} - ${team1} ${team1Score}` + '<br/>' + 'Loss'
                resultTeam1.hoverOver = `${team2} ${team2Score} - ${team1} ${team1Score}` + '<br/>' + 'Win'
              }
      
              dataArray.push(resultTeam1)
              dataArray.push(resultTeam2)
            })
          })
          let seriesObject = {}
          seriesObject.data = dataArray
          let seriesArray = [seriesObject]
        //   console.log(seriesArray)
          // this.setState(prev => {
                
                return {
                  options: Object.assign(testoptions, {series: seriesArray}),
                  // options: Object.assign(prev.options, {series: seriesArray}),
                  // done: true
                }  
            //  return {series: seriesArray, done: true}
            // })
          // return this.launchChart(seriesArray)
        // return this.launchChart()
      }

      this.state = {options: buildChart(), done: false}
    
    }

      // launchChart = (seriesValues) => {
    launchChart = () => {

        //     // this.props.onDoneLoading()
    // console.log("launching", this.state.series)
    return <div>{true ? <GanttChart2 options={this.state.options}/>: null}</div>

    // return <div><GanttChart2 series={seriesValues}/></div>
        // return <div><GanttChart2 series={this.state.series}/></div>
    }

    // updateState = () => {
    //     this.setState({})
    //     return <p>set!</p>
    // }

    render () {
        // if (this.props.analysis.loaded && this.props.analysis.games !== undefined) {
        //     console.log(this.props.analysis.games)
        // }
        return (
            <div>
                {/* {this.props.analysis.loaded && !this.state.done ? this.buildChart(): <h2>loading....</h2>} */}
                
                {/* {this.state.done ? this.launchChart():<h2>still loading...</h2>} */}
                {this.props.analysis.batch !== undefined ? <p>{this.props.analysis.batch.length}</p>: <p>no hi</p>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      analysis: state.analysis
    }
  }


  
  export default connect(mapStateToProps)(Interstitial)