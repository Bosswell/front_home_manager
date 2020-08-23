import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import InputGroup from '../components/InputGroup';
import ErrorList from "../components/ErrorList";
import {AuthContext} from "../AuthContext";
import authProvider from "../providers/authProvider";

function LoginForm({setLoading}) {
    const { authed, setAuthed } = useContext(AuthContext);
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [inputData, setInputData] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(event) {
        const target = event.target;

        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let tmpErrors = [];

        if (inputData.email === '') {
            tmpErrors.push(['Address email is empty']);
        }

        if (inputData.password === '') {
            tmpErrors.push(['You did not enter your password']);
        }

        if (tmpErrors.length !== 0) {
            await setErrors(tmpErrors);
            return;
        }

        setLoading(true);

        await authProvider.login({
            username: inputData.email,
            password: inputData.password
        }).then(response => {
            setLoading(false);

            if (response && response.hasError) {
                setErrors(response.errors);
            } else {
                setAuthed(true);
            }
        })
    }

    return (
        <div className={'login-form'}>
            <h3 className={'text-center'}>Sign in to Cash Manager</h3>
            <form className={'form --vertical'} onSubmit={handleSubmit}>
                <InputGroup onChange={handleInputChange} name={'email'} type={'email'} label={'Address email'}/>
                <InputGroup onChange={handleInputChange} name={'password'} type={'password'} label={'Password'}/>
                <Link to={'/register'}><small className={'text-right'}>Don't have account yet? Click to create!</small></Link>

                <button className={'--bg-charcoal --btn-full'}>Sign in</button>
            </form>
            <ErrorList errors={errors} />
        </div>
    );

}

export default LoginForm;
