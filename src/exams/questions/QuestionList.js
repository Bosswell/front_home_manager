import React from "react";
import { ListGroup } from "react-bootstrap";
import { QUESTION_DETAILS_ROUTE } from "../../constants/routes";
import { truncate } from "../../helpers/truncate";
import { Html5Entities } from "html-entities";
import { useHistory } from "react-router-dom";

function QuestionList({ questions, handleUnlink }) {
    const htmlEntities = new Html5Entities();
    const history = useHistory();

    return (
        <ListGroup className={'entry-list'} variant="flush">
            {questions.map((question) => {
                const query = htmlEntities.decode(question.query.replace(/<[^>]+>/g, ''));

                return (
                    <ListGroup.Item key={question.id} className={'item-with-action'}>
                        <div
                            className={'text-info pointer btn-link'}
                            onClick={() => { history.push(QUESTION_DETAILS_ROUTE + question.id) }}
                        >
                            { truncate(query, 35) }
                        </div>
                        <div className={'text-danger pointer btn-link'} onClick={() => handleUnlink(question.id)}>
                            unlink
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default QuestionList;