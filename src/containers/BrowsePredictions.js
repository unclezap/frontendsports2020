import React from "react"
// import PredictionCard from '../components/Predictions';
import { Container, Row } from 'react-bootstrap';
import AuthHOC from '../HOC/AuthHOC';
import { connect } from 'react-redux';
import { fetchBatches } from '../redux';
import AnalysisCard from '../components/AnalysisCard'

class BrowsePredictions extends React.Component {

    componentDidMount() {
        this.props.onFetchBatches()
    }

    handleGoBack (event) {
        event.preventDefault()
    }

    allPredictions = () => {
        if (this.props.batch.loaded === true) {
            return this.props.batch.batch.map((batch, index) => {
                return <AnalysisCard
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
        failure: state.batch.failure,
        loading: state.batch.loading,
        loaded: state.batch.loaded,
        batch: state.batch,
        style: state.style
    }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(BrowsePredictions));
