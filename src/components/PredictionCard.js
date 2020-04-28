import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function PredictionCard() {

    return (

        <Card style={{ width: '18rem' }} className="text-center">
            {/* <Card.Title>{title}</Card.Title> */}
            {/* <Card.Text >{description}</Card.Text> */}
            {/* <Card.Subtitle className="text-muted">Category: {category}</Card.Subtitle> */}
            {/* <Link to={`/${props.previousPage}/${id}`} className="btn btn-outline-dark">{props.previousPage == "quizzes" ? "Take Quiz" : "See Score"}</Link> */}
            <ScoreCard />
        </Card>
    )
}

export default PredictionCard;