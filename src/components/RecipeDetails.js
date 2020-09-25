import React from "react";
import { Row, Col } from "react-bootstrap";

function RecipeDetails({ setDetails }) {
    return (
        <Row>
            <Col lg={12}>
                <div onClick={() => {setDetails(prevState => ({...prevState, show: false}))}}>Close</div>
                <h2>Hello world</h2>
            </Col>
        </Row>
    );
}

export default RecipeDetails;