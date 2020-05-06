import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import { connect } from 'react-redux';

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
      series: [
        {
          data: [
            {
              name: "New England Patriots Results",
              team: "Patriots",
              id: "patriots_results",
              dependency: "",
              opacity: 1.0,
              color: 'rgb(0,0,255)',
              start: 1,
              milestone: true
            },
            {
              name: "Patriots Predictions",
              team: "Patriots",
              id: "patriots_predictions",
              parent: "patriots_results",
              start: 8.5,
              opacity: 0.5,
              color: 'rgb(0,0,255)',
              milestone: true,
            },
            {
              name: "ESPN Accuracy",
              team: "Patriots",
              id: "patriots_accuracy",
              parent: "patriots_results",
              start: 1,
              opacity: 0.1,
              color: 'rgb(230,0,0)',
              milestone: true,
            },
            {
              name: "Buffalo Bills Results",
              team: "Bills",
              id: "bills_results",
              dependency: "patriots",
              start: 1,
              opacity: 0.2,
              color: 'rgb(0,0,0,0.8)',
              milestone: true
            },
            {
              name: "Bills Predictions",
              team: "Bills",
              id: "bills_predictions",
              parent: "bills_results",
              start: 1,
              opacity: 0.8,
              color: 'rgb(0,181,0)',
              milestone: true,
            },
            {
              name: "ESPN Accuracy",
              team: "Bills",
              id: "bills_accuracy",
              parent: "bills_results",
              start: 1,
              opacity: 0.1,
              color: 'rgb(255,229,0)',
              milestone: true,
            }
          ]
        }
      ]
    }
  };
  
  buildChart = () => {
    let chartObject = this.props.analysis.batch.map(batch => {
      console.log("its a batch")
      return batch.games.map(game => {
        console.log("its a game")
        return {type: "yo"}
      })

    })
    console.log(chartObject)
  }


  render() {
    
    if (this.props.analysis.loaded) {
      this.buildChart()
    }

    return (
      <HighchartsReact
        constructorType={"ganttChart"}
        highcharts={Highcharts}
        options={this.state.options}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    analysis: state.analysis
  }
}

export default connect(mapStateToProps)(GanttChart2)