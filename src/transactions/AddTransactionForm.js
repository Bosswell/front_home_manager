import React, {useState} from "react";
import Select from "react-select";
import { addTransaction } from "../services/transaction.service";
import Alert from "../components/Alert";
import Switch from "react-switch";
import {taxPercentageOptions} from "../constants/transactionOptions";

function AddTransactionForm({setLoading, transactionTypes}) {
    const [alert, setAlert] = useState('');
    const [errors, setErrors] = useState([]);
    const [inputData, setInputData] = useState({
        amount: 0,
        description: '',
        transactionTypeId: null,
        taxPercentage: null,
        isIncome: false
    });
    const [isDeductible, setDeductible] = useState(false);

    function handleInputChange({ target }) {
        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    function handleSelectChange({ value }) {
        setInputData(prevState => ({
            ...prevState,
            transactionTypeId: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        const transaction = {
            ...inputData,
            ...((inputData.isIncome || !isDeductible) && {taxPercentage: null}),
        };

        setInputData(transaction)

        const response = await addTransaction(transaction);

        if (response.hasError) {
            setErrors(response.errors.length ? response.errors : [response.message]);
        } else {
            setErrors([]);
            setAlert(response.message);
        }

        setLoading(false);
    }

    function handleTaxPercentageChange({ value }) {
        setInputData(prevState => ({
            ...prevState,
            taxPercentage: value
        }));
    }

    return (
        <div className={'add-transaction-form'}>
            <form className={'form --vertical'} onSubmit={handleSubmit}>
                <Select onChange={handleSelectChange} options={transactionTypes} placeholder={'Transaction type'}/>
                <div className={'input-group'}>
                    <label htmlFor={'amount'}>Amount - tax included (PLN)</label>
                    <input
                        onChange={handleInputChange}
                        type={'number'}
                        id={'amount'}
                        name={'amount'}
                        step={'0.01'}
                        required={true}
                    />
                </div>
                <div className={'input-group'}>
                    <label htmlFor={'amount'}>Description</label>
                    <input
                        onChange={handleInputChange}
                        type={'text'}
                        id={'description'}
                        name={'description'}
                    />
                </div>

                <div>Is income?</div>
                <Switch
                    onChange={() => setInputData(prevState => ({ ...prevState, isIncome: !prevState.isIncome }))}
                    checked={inputData.isIncome}
                    checkedIcon={false}
                    uncheckedIcon={false}
                />

                {!inputData.isIncome && <>
                    <div>May be tax deductible?</div>
                    <Switch
                        onChange={() => setDeductible(prevState => !prevState)}
                        checked={isDeductible}
                        checkedIcon={false}
                        uncheckedIcon={false}
                    />
                    {isDeductible && <Select onChange={handleTaxPercentageChange} options={taxPercentageOptions} placeholder={'Tax percentage'}/>}
                </>}

                <button className={'--bg-charcoal --btn-full'}>Add transaction</button>
            </form>
            <br/>

            {errors.length > 0 && <Alert type={'danger'} headMsg="An errors has occurred" messages={errors}/>}
            {alert && <Alert type={'success'} messages={alert}/>}
        </div>
    );
}

export default AddTransactionForm;
