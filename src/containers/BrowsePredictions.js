import React from "react"
import { Container, Row } from 'react-bootstrap';
import AuthHOC from '../HOC/AuthHOC';
import { connect } from 'react-redux';
import { fetchBatches } from '../redux';
import AnalysisCard from '../components/AnalysisCard'

class BrowsePredictions extends React.Component {

    componentDidMount() {
        this.props.onFetchBatches()
    }

    handleGoBack = (event) => {
        // event.preventDefault()
        // console.log("GO BACK!")
    }

    allPredictions = () => {
        if (this.props.batches.loaded === true) {
            return this.props.batches.batches.map((batch, index) => {
                return <AnalysisCard
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
        failure: state.batches.failure,
        loading: state.batches.loading,
        loaded: state.batches.loaded,
        batches: state.batches,
        style: state.style
    }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(BrowsePredictions));
