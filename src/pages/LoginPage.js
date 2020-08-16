import React, { useState } from 'react'
import LoginForm from '../forms/LoginForm'
import { useHistory } from 'react-router-dom'
import AuthService from '../services/auth.service'
import Loader from '../components/Loader'
import '../scss/login-page.scss'


function LoginPage() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
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

        let response = await AuthService.login({
            username: inputData.email,
            password: inputData.password
        });

        setLoading(false);

        if (response.errors) {
            await setErrors(response.errors);
            return;
        }

        history.push('/dashboard');
    }

    return (
        <div className={'login-page'}>
            {loading && <Loader loading={loading}/>}
            <LoginForm errors={errors} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
        </div>
    );
}

export default LoginPage;