import React, {useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { deleteTransaction } from "../services/transaction.service";


function DeleteTransactionModal({ selected, setLoading, setError, setAlert, setSelectedItem }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        setShow(selected.status === 'confirm');
    }, [selected]);

    function handleDeleteTransaction() {
        setSelectedItem(prevState => ({
            ...prevState,
            status: 'deleted'
        }));

        setLoading(true);

        deleteTransaction(selected.item.id).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            setAlert(response.message);
            setError(null);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <Modal show={show} onHide={handleClose} animation={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the transaction?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteTransaction}>
                    Confirm delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteTransactionModal;