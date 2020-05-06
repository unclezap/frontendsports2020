import React from "react"
import { Container, Row } from 'react-bootstrap';
import AuthHOC from '../HOC/AuthHOC';
import { connect } from 'react-redux';
import { fetchBatches } from '../redux';
import AnalysisCard from '../components/AnalysisCard'
import GanttChart2 from '../charts/GanttChart2'
import Interstitial from '../charts/Interstitial'

class BrowsePredictions extends React.Component {

    state = {chartDone: false}

    componentDidMount() {
        this.props.onFetchBatches()
    }

    handleGoBack = (event) => {
        // event.preventDefault()
        // console.log("GO BACK!")
    }

    reRender = () => {
        console.log("rerendering")
        this.setState({chartDone: false})
    }

    allPredictions = () => {
        if (this.props.batches.loaded === true) {
            return this.props.batches.batches.map((batch, index) => {
                return <AnalysisCard
                            onReRender={this.reRender.bind(this)}
                            key={index}
                            previousPage={"browse"}
                            onGoBack={this.handleGoBack.bind(this)}
                            predictions={batch.predictions}
                            scores={batch.scores}
                            batch={batch}
                            loaded={this.props.loaded}
                        />
            })
        }
    }


    buildChart = () => {
        console.log("build")
        let weeks = []
        for (let i=0; i< 22; i++) {
          weeks.push(`Week ${i}`)
        }

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
          let chartOptionsObject =  {
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
            series: seriesArray
          }
          console.log(chartOptionsObject)
        //   return chartOptionsObject
        
            this.setState({options:chartOptionsObject, chartDone: true})
        this.forceUpdate()

        //     if (this.state.options !== undefined) {
        //         console.log("length above 0")
        //         this.setState({chartDone: true})

        //         //     return <div><GanttChart2 options={chartOptionsObject}/></div>
        // } else {
        //     console.log("length below zero")
        //     return <p>waiting for objects to load</p>
        // }
    }
        

        launchChart = () => {
            console.log("launching")
            console.log("state", this.state)
            return <div><GanttChart2 options={this.state.options}/></div>
        }

    render() {
        return (
            <Container fluid="md">
                {this.props.analysis.loaded && !this.state.chartDone ? this.buildChart() : null}
                {this.state.chartDone ? this.launchChart() : null}
                    {/* <GanttChart2 series={this.buildChart()}/> */}
                    {/* <Interstitial analysis={this.props.analysis} /> */}
                <Row>
                    {this.allPredictions()}
                </Row>
            </Container>    
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchBatches: () => dispatch(fetchBatches())      
    }
}

const mapStateToProps = state => {
    return {
        failure: state.batches.failure,
        loading: state.batches.loading,
        loaded: state.batches.loaded,
        batches: state.batches,
        style: state.style,
        analysis: state.analysis
    }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(BrowsePredictions));
