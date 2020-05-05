import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class BarChart extends React.Component {

        state = {
            chartOptions: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Bar Chart!'
                },
                xAxis: {
                    categories: ['Correct', 'Incorrect', 'Total', 'Av. Error']
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
                    data: [0, 0, 0, 0]
                }]
            },
            clicked: false
        }

    updateSeries = () => {
        this.setState(prev => {
                let total = this.props.analysis.correct + this.props.analysis.incorrect
                return {
                    chartOptions: Object.assign(prev.chartOptions, {series: [{
                            name: 'Week1',
                            data: [
                                this.props.analysis.correct,
                                this.props.analysis.incorrect,
                                total,
                                (this.props.analysis.errorMargin/total)
                            ]
                        }]
                    }),
                    clicked: !prev.clicked
                }
            }
        );
    }

    render () {
        const { chartOptions, clicked } = this.state
        
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

export default BarChart