import React from "react";
import { BiArrowBack } from "react-icons/bi";
import Button from "react-bootstrap/Button";

function DetailsNav({ onReturn, action, setAction, onDelete }) {
    return (
        <nav className={'details__nav'}>
            <div className={'details__nav--back'} onClick={onReturn}>
                <BiArrowBack/> <span>back</span>
            </div>

            <div className={'details__nav__actions'}>
                {action === 'view' ?
                    <Button className={'details--action-btn'} variant={'outline-warning'} onClick={() => setAction('edit')}>
                        Edit
                    </Button>
                    :
                    <Button className={'details--action-btn'} variant={'outline-info'} onClick={() => setAction('view')}>
                        View
                    </Button>
                }

                <Button className={'details--action-btn'} variant={'outline-danger'} onClick={onDelete}>Delete</Button>
            </div>
        </nav>
    )
}

export default DetailsNav;