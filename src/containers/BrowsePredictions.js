import React from "react"
// import PredictionCard from '../components/Predictions';
import { Container, Row, Col } from 'react-bootstrap';
import AuthHOC from '../HOC/AuthHOC';
import { connect } from 'react-redux';
import { fetchBatches } from '../redux';

class BrowsePredictions extends React.Component {

    componentDidMount() {
        console.log("hi")
        this.props.onFetchBatches()
    }

    allPredictions = () => {
        return <p>This feature is being built out!</p>
        // return this.props.allPredictions.map((thisPrediction, index) => {
        //     return (<Col><PredictionCard key={index} prediction={thisPrediction}/></Col>)
        // })
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
        batch: state.batch
    }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(BrowsePredictions));
