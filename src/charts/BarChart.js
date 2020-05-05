import React from 'react';
// import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class LineChart extends React.Component {
    // constructor(props) {
        // super(props)

        state = {
            chartOptions: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Bar Chart!'
                },
                xAxis: {
                    categories: ['Correct', 'Incorrect', 'Total']
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Games'
                    }
                },
                series: [{
                    name: 'Week 1',
                    data: [0, 0, 0]
                }],
                plotOptions: {
                    series: {
                        points: {
                            events: {
                                // mouseOver: this.setHoverData.bind(this.state)
                            }
                        }
                    }
                }
            },
            // hoverData: null,
            clicked: false
        }
    // }

    setHoverData = (event) => {
        this.setState({hoverData: event.target.category})
    }

    updateSeries = () => {
        this.setState(prev => ({
            // books: [...prev.books, { title: "Valid title" }]
            // const copy = Object.assign({}, obj)
                // series: [{
                //     name: 'Week 1',
                //     data: [this.props.analysis.correct, 6, 18]
                // }],
                chartOptions: Object.assign(prev.chartOptions, {series: [{name: 'Week1', data: [this.props.analysis.correct, this.props.analysis.incorrect, this.props.analysis.correct + this.props.analysis.incorrect]}]}),
                clicked: !prev.clicked
            })
        );
    }

    render () {
        const { chartOptions, hoverData, series, clicked } = this.state
        
        return (
            <div>
                {clicked
                ? <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                  />
                : null}
                <button type="submit" onClick={this.updateSeries.bind(this)}>Show Graph</button>
            </div>
        )
    }
}

export default LineChart