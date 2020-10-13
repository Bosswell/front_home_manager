import React from "react";
import { ListGroup } from "react-bootstrap";
import { OPTION_DETAILS_ROUTE } from "../../constants/routes";
import { truncate } from "../../helpers/truncate";
import { Html5Entities } from "html-entities";
import { useHistory } from "react-router-dom";

function OptionList({ options, setShowDeleteModal, setClickedOptionId }) {
    const htmlEntities = new Html5Entities();
    const history = useHistory();

    return (
        <ListGroup className={'entry-list'} variant="flush">
            {options.map(({ content, id, isCorrect }) => {
                const val = htmlEntities.decode(content.replace(/<[^>]+>/g, ''));

                return (
                    <ListGroup.Item key={id} className={'item-with-action'}>
                        <div className={'text-info'}>
                                        <span className={'pointer btn-link'} onClick={() => { history.push(OPTION_DETAILS_ROUTE + id) }}>
                                            { truncate(val, 35) }
                                        </span>
                            <span className={isCorrect ? 'text-success' : 'text-danger'}> - {isCorrect ? 'is correct' : 'is incorrect'}</span>
                        </div>
                        <div className={'text-danger pointer btn-link'} onClick={() => { setClickedOptionId(id); setShowDeleteModal(true) }}>
                            delete
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default OptionList;