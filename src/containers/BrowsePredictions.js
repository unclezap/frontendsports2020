import React from "react"
import { Container, Row } from 'react-bootstrap';
import AuthHOC from '../HOC/AuthHOC';
import { connect } from 'react-redux';
import { fetchBatches } from '../redux';
import AnalysisCard from '../components/AnalysisCard'
import GanttChart2 from '../charts/GanttChart2'
// import { addChartObject } from '../redux'
import { clearAnalysis } from '../redux'

class BrowsePredictions extends React.Component {

    state = {
        chartDone: false,
        spinner: Math.floor(Math.random()*2) + 1
    }

    componentDidMount() {
        this.props.onClearAnalysis()
        this.props.onFetchBatches()
    }

    handleGoBack = (event) => {
    }

    allPredictions = () => {
        if (this.props.batches.loaded === true) {
            return this.props.batches.batches.map((batch, index) => {
                return <AnalysisCard
                            display="flex"
                            key={index}
                            previousPage={"browse"}
                            onGoBack={this.handleGoBack.bind(this)}
                            predictions={batch.predictions}
                            scores={batch.scores}
                            batch={batch}
                            loaded={this.props.loaded}
                        />
            })
        } else {
            return (
                <div>
                    <h2>{this.state.spinner === 1? <div style={{backgroundImage: this.props.style.loading1, height: "460px", width: "460px"}}/> : null }
                    </h2>
                    <h2>{this.state.spinner === 2? <div style={{backgroundImage: this.props.style.loading2, height: "460px", width: "460px"}}/> : null }</h2>
                </div>
            )
        }
    }

    render() {
        return (
            <Container display="flex">
                {this.props.analysis.loaded ? <GanttChart2 /> : null}
                <Row display="flex">
                    {this.allPredictions()}
                </Row>
            </Container>    
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onClearAnalysis: () => dispatch(clearAnalysis()),
        onFetchBatches: () => dispatch(fetchBatches()),
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
