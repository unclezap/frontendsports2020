import React from "react"
// import PredictionCard from '../components/Predictions';
import { Container, Row } from 'react-bootstrap';
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
        // return this.props.batch.map((thisPrediction, index) => {
        //     return (<Col><PredictionCard key={index} prediction={thisPrediction} analysisIndex={index} prevPage={Browse}/></Col>)
        // })
    }

    render() {
        console.log(this.props)
        console.log(this.props.article)
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
        batch: state.batch,
        article: state.article.article
    }
}


export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(BrowsePredictions));
