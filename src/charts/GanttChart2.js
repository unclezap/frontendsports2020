import React from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";

// import HC_more from "highcharts/highcharts-more";

// HC_more(Highcharts);

// var today = new Date(),
// day = 1000 * 60 * 60 * 24,

//   // Utility functions
//   dateFormat = Highcharts.dateFormat,
//   defined = Highcharts.defined,
//   isObject = Highcharts.isObject,
//   reduce = Highcharts.reduce;

// // Set to 00:00:00:000 today
// today.setUTCHours(0);
// today.setUTCMinutes(0);
// today.setUTCSeconds(0);
// today.setUTCMilliseconds(0);
// today = today.getTime();

// const weeks = () => {
  let weeks = []
  for (let i=0; i< 22; i++) {
    weeks.push(`Week ${i}`)
  }
  // return array
// }


class GanttChart2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: {
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
                name: "New offices",
                id: "new_offices",
                owner: "Peter",
                start: 1,
                end: 7
              },
              {
                name: "Prepare office building",
                id: "prepare_building",
                parent: "new_offices",
                start: 8.5,
                transparency: 0.5,
                end: 9.5,
                color: 'rgba(255,229,0,1)',
                // completed: {
                  // amount: 0.2
                // },
                milestone: true,
                labelrank: 1,
                y: 5,
                owner: "Linda"
              },
              {
                name: "Prepare office building",
                id: "prepare_building",
                parent: "new_offices",
                dependency: "passed_inspection",
                start: 12,
                transparency: 0.5,
                end: 21,
                color: 'rgba(255,229,0,1)',
                labelrank: 2,
                // completed: {
                  // amount: 0.2
                // },
                milestone: false,

                owner: "Linda"
              },
              {
                name: "Inspect building",
                id: "inspect_building",
                // dependency: ["prepare_building","passed_inspection"],
                // dependency: 
                parent: "new_offices",
                start: 12,
                end: 17,
                owner: "Ivy",
                color: 'rgba(230,0,0,0.5)',
                milestone: true
              },
              {
                name: "Passed inspection",
                id: "passed_inspection",
                // dependency: "inspect_building",
                parent: "new_offices",
                start: 12,
                end: 13,
                color: 'rgba(0,181,0,0.1)',
                milestone: true,
                owner: "Peter"
              }
            ],
          }, 
        ],
      }
    };
  }

  render() {
    return (
      <HighchartsReact
        // constructorType={"chart"}
        constructorType={"ganttChart"}
        // constructorType={x}
        // ref={this.chartComponent}
        highcharts={Highcharts}
        options={this.state.options}
      />
    );
  }
}

export default GanttChart2