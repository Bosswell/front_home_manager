import React, {useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { updateTransaction } from "../services/transaction.service";
import Select from "react-select";


function EditTransactionModal({ selected, setLoading, setError, setAlert, setSelectedItem, transactionTypes }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [inputData, setInputData] = useState({});
    const [transactionType, setTransactionType] = useState();

    useEffect(() => {
        setShow(selected.status === 'edit');
        setTransactionType(transactionTypes.filter((transactionType) => {
            return transactionType.value ===parseInt(selected.item.transactionTypeId);
        }));
        setInputData(Object.assign({}, selected.item));

    }, [selected, transactionTypes]);

    function handleInputChange(event) {
        const target = event.target;

        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    function handleUpdateTransaction() {
        setSelectedItem({
            item: inputData,
            status: 'updated'
        });

        setLoading(true);
        updateTransaction(inputData).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            console.log(response);
            setAlert(response.message);
            setError(null);
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleSelectChange(selected) {
        setTransactionType(selected);
        setInputData(prevState => ({
            ...prevState,
            transactionTypeId: selected.value,
            name: selected.label
        }));
    }

    return (
        <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Update transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className={'form --vertical'}>
                    <Select value={transactionType} onChange={handleSelectChange} options={transactionTypes} placeholder={'Transaction type'}/>
                    <div className={'input-group'}>
                        <label htmlFor={'amount'}>Amount (PLN)</label>
                        <input
                            onChange={handleInputChange}
                            type={'number'}
                            id={'amount'}
                            name={'amount'}
                            step={'0.01'}
                            required={true}
                            value={inputData.amount}
                        />
                    </div>
                    <div className={'input-group'}>
                        <label htmlFor={'amount'}>Description</label>
                        <input
                            onChange={handleInputChange}
                            type={'text'}
                            id={'description'}
                            name={'description'}
                            value={inputData.description}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="warning" onClick={handleUpdateTransaction}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTransactionModal;