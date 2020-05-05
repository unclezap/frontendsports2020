import React from 'react';
// import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class LineChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chartOptions: {
                xAxis: {
                    categories: ['A','B','C']
                },
                series: [
                    { data: [1,2,3] }
                ],
                plotOptions: {
                    series: {
                        points: {
                            events: {
                                mouseOver: this.setHoverData.bind(this)
                            }
                        }
                    }
                }
            },
            hoverData: null
        }
    }

    setHoverData = (event) => {
        this.setState({hoverData: event.target.category})
    }

    updateSeries = () => {
        this.setState({
            chartOptions: {
                series: [
                    {data: [Math.random() * 5, 2, 1]}
                ]
            }
        });
    }

    render () {
        const { chartOptions, hoverData } = this.state
        
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
                <h3>Hovering over {hoverData}</h3>
                <button onClick={this.updateSeries.bind(this)}>Update Series</button>
            </div>
        )
    }
}

export default LineChart