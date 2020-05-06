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
      series: this.props.series
    }
  };

  render() {
    return (
      <div>
        <HighchartsReact
          constructorType={"ganttChart"}
          highcharts={Highcharts}
          options={this.state.options}
        />
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