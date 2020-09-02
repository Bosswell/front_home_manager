import React, {useState} from "react";
import InputGroup from "../components/InputGroup";
import Select from "react-select";
import { addTransaction } from "../services/transaction.service";
import Alert from "../components/Alert";

function AddTransactionForm({setLoading, transactionTypes}) {
    const [alert, setAlert] = useState('');
    const [errors, setErrors] = useState([]);
    const [inputData, setInputData] = useState({
        amount: 0,
        description: '',
        transactionTypeId: null
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
        inputData.amount = parseFloat(inputData.amount)
        const response = await addTransaction(inputData);

        if (response.hasError) {
            setErrors(response.errors.length ? response.errors : [response.message]);
        } else {
            setErrors([]);
            setAlert(response.message);
        }

        setLoading(false);
    }

    return (
        <div className={'add-transaction-form'}>
            <form className={'form --vertical'} onSubmit={handleSubmit}>
                <Select onChange={handleSelectChange} options={transactionTypes} placeholder={'Transaction type'}/>
                <div className={'input-group'}>
                    <label htmlFor={'amount'}>Amount (PLN)</label>
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

                <button className={'--bg-charcoal --btn-full'}>Add transaction</button>
            </form>
            <br/>

            {errors.length > 0 && <Alert type={'danger'} headMsg="An errors has occured" messages={errors}/>}
            {alert && <Alert type={'success'} messages={alert}/>}
        </div>
    );
}

export default AddTransactionForm;
