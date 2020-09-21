import React, {useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { updateTransaction } from "../services/transaction.service";
import Select from "react-select";
import Switch from "react-switch";
import { taxPercentageOptions } from "../constants/transactionOptions";


function EditTransactionModal({ selected, setLoading, setError, setAlert, setSelectedItem, transactionTypes }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [inputData, setInputData] = useState({});

    useEffect(() => {
        setShow(selected.status === 'edit');
        setInputData(Object.assign({}, selected.item, {
            isIncome: parseInt(selected.item.isIncome) !== 0,
            isDeductible: selected.item.taxPercentage !== null,
            transactionType: transactionTypes.find((transactionType) => {
                return transactionType.value === parseInt(selected.item.transactionTypeId);
            }),
            taxPercentage: taxPercentageOptions.find((taxOption) => {
                return taxOption.value === parseInt(selected.item.taxPercentage);
            })
        }));

    }, [selected, transactionTypes]);

    function handleInputChange({ target }) {
        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    function handleUpdateTransaction() {
        const transaction = {
            ...inputData,
            transactionTypeId: inputData.transactionType.value,
            name: inputData.transactionType.label,
            taxPercentage: inputData.isDeductible && !inputData.isIncome ? inputData.taxPercentage.value : null
        };

        setSelectedItem({
            item: transaction,
            status: 'updated'
        });

        setLoading(true);
        updateTransaction(transaction).then(response => {
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

    function handleSelectChange(selected) {
        setInputData(prevState => ({
            ...prevState,
            transactionType: selected
        }));
    }

    function handleTaxPercentageChange(selected) {
        setInputData(prevState => ({
            ...prevState,
            taxPercentage: selected
        }));
    }

    return (
        <Modal show={show} onHide={handleClose} animation={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className={'form --vertical'}>
                    <Select value={inputData.transactionType} onChange={handleSelectChange} options={transactionTypes} placeholder={'Transaction type'}/>
                    <div className={'input-group'}>
                        <label htmlFor={'amount'}>Amount - tax included (PLN)</label>
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

                    <div>Is income</div>
                    <Switch
                        onChange={() => setInputData(prevState => ({ ...prevState, isIncome: !prevState.isIncome }))}
                        checked={!!inputData.isIncome}
                        checkedIcon={false}
                        uncheckedIcon={false}
                    />

                    {!inputData.isIncome && <>
                        <div>May be tax deductible?</div>
                        <Switch
                            onChange={() => setInputData(prevState => ({ ...prevState, isDeductible: !prevState.isDeductible }))}
                            checked={!!inputData.isDeductible}
                            checkedIcon={false}
                            uncheckedIcon={false}
                        />
                        {inputData.isDeductible && <Select value={inputData.taxPercentage} onChange={handleTaxPercentageChange} options={taxPercentageOptions} placeholder={'Tax percentage'}/>}
                    </>}
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