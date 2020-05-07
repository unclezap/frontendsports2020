import React from "react"
import { Container, Row } from 'react-bootstrap';
import AuthHOC from '../HOC/AuthHOC';
import { connect } from 'react-redux';
import { fetchBatches } from '../redux';
import AnalysisCard from '../components/AnalysisCard'
import GanttChart2 from '../charts/GanttChart2'
// import Interstitial from '../charts/Interstitial'
import { addChartObject } from '../redux'

class BrowsePredictions extends React.Component {

    state = {chartDone: false}

    componentDidMount() {
        console.log("mounting")
        this.props.onFetchBatches()
    }

    handleGoBack = (event) => {
        // event.preventDefault()
        // console.log("GO BACK!")
    }

    // reRender = () => {
    //     console.log("rerendering")
    //     this.setState(prev => {
    //         return {chartDone: false}})
    // }

    allPredictions = () => {
        if (this.props.batches.loaded === true) {
            return this.props.batches.batches.map((batch, index) => {
                return <AnalysisCard
                            // onReRender={this.reRender.bind(this)}
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

    render() {
        return (
            <Container fluid="md">
                <GanttChart2 />
                <Row>
                    {this.allPredictions()}
                </Row>
            </Container>    
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchBatches: () => dispatch(fetchBatches()),
        onAddChartObject: (chartObject) => dispatch(addChartObject(chartObject))      
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
