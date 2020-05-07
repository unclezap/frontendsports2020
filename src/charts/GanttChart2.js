import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'

let weeks = []
for (let i=0; i< 22; i++) {
  weeks.push(`Week ${i}`)
}

// let opt = localStorage.getItem("options")

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
      series: this.props.series
    }
  };

  showChart = () => {
    return (
      <HighchartsReact
          constructorType={"ganttChart"}
          highcharts={Highcharts}
          // options={JSON.parse(localStorage.getItem("options"))}
          options={this.props.options}
        />
    )
  }


  render() {
    return (
      <div>
      { this.props.options ? this.showChart() : null}
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     analysis: state.analysis
//   }
// }

export default GanttChart2

// export default connect(mapStateToProps)(GanttChart2)

