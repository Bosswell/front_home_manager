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
            {questions.map(({ id, query }) => {
                const text = htmlEntities.decode(query.replace(/<[^>]+>/g, ''));

                return (
                    <ListGroup.Item key={id} className={'item-with-action'}>
                        <div
                            className={'text-info pointer btn-link'}
                            onClick={() => { history.push(QUESTION_DETAILS_ROUTE + id) }}
                        >
                            { id }. { truncate(text, 35) }
                        </div>
                        <div className={'text-danger pointer btn-link'} onClick={() => handleUnlink(id)}>
                            unlink
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default QuestionList;