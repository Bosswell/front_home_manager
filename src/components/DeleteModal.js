import React from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function DeleteModal({ show, setShow, handleDelete, entityName }) {
    return (
        <Modal show={show} onHide={() => setShow(false)} animation={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete { entityName }</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the { entityName }?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Confirm delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;