import React, {useState} from "react";
import InputGroup from "../components/InputGroup";
import ErrorList from "../components/ErrorList";
import Select from "react-select";
import {addTransaction, getTransactionTypes} from "../services/transaction.service";
import Alert, {SUCCESS_ALERT} from "../components/Alert";

function AddTransactionForm({setLoading}) {
    const [errors, setErrors] = useState([]);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [alert, setAlert] = useState('');
    const [inputData, setInputData] = useState({
        amount: 0,
        description: '',
        transactionTypeId: null
    });

    useState(() => {
        getTransactionTypes().then(response => {
            if (response.hasError) {
                setErrors(response.errors.length ? response.errors : [response.message]);
            } else {
                setTransactionTypes(response.data);
            }
        })
    });

    function handleInputChange(event) {
        const target = event.target;

        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    function handleSelectChange(selectedOption) {
        setInputData(Object.assign({}, inputData, {
            transactionTypeId: selectedOption.value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        const response = await addTransaction(inputData);

        if (response.hasError) {
            await setErrors(response.errors.length ? response.errors : [response.message]);
        } else {
            await setErrors([]);
            await setAlert(response.message);
        }

        setLoading(false);
    }

    return (
        <div className={'add-transaction-form'}>
            <h3 className={'text-center'}>Create transaction</h3>
            <form className={'form --vertical'} onSubmit={handleSubmit}>
                <Select onChange={handleSelectChange} options={transactionTypes} placeholder={'Transaction type'}/>
                <InputGroup onChange={handleInputChange} name={'amount'} type={'number'} label={'Amount (PLN)'}/>
                <InputGroup onChange={handleInputChange} name={'description'} type={'text'} label={'Description'}/>

                <button className={'--bg-charcoal --btn-full'}>Add transaction</button>
            </form>
            <ErrorList errors={errors} />
            <br/>
            {alert && <Alert type={SUCCESS_ALERT} message={alert}/>}
        </div>
    );
}

export default AddTransactionForm;
