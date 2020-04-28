import React from "react"
import PredictionCard from '../components/Predictions';
import { Container, Row, Col } from 'react-bootstrap';

function OldPredictions() {

    function allPredictions() {
        return props.allPredictions.map((thisPrediction, index) => {
            return (<Col><PredictionCard key={index} prediction={thisPrediction}/></Col>)
        })
    }
    
    return (
        <Container fluid="md">
            <Row>
                {allPredictions()}
            </Row>
        </Container>
    )
}

export default Browse