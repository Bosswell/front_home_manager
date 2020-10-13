import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../scss/entity-details.scss";


function OptionDetails({ option: { id, isCorrect, content}}) {
    return (
        <Row>
            <Col lg={6}>
                <h4>Details</h4>
                <div>Id: <b>{id}</b></div>
                <div>Is correct? <b>{isCorrect ? 'Yes' : 'No'}</b></div>
                <div>
                    Content:
                    <div dangerouslySetInnerHTML={({__html: content})}/>
                </div>
            </Col>
        </Row>
    )
}

export default OptionDetails;