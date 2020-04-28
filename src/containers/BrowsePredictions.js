import React from "react"
// import PredictionCard from '../components/Predictions';
import { Container, Row, Col } from 'react-bootstrap';


class BrowsePredictions extends React.Component {

    allPredictions = () => {
        return <p>Add predictions!</p>
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

export default BrowsePredictions

