import React from 'react';
import '../scss/login-page.scss';
import LoginForm from '../components/LoginForm';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service'

function LoginPage() {
    const history = useHistory();
    let errors = [];
    let inputData = {
        email: '',
        password: ''
    };

    function handleInputChange(event) {
        const target = event.target;

        inputData[target.name] = target.value;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (inputData.email === '') {
            errors.push('Address email is empty');
        }

        if (inputData.password === '') {
            errors.push('You did not enter your password');
        }

        if (errors.length === 0) {
            AuthService.login({
                username: inputData.email,
                password: inputData.password
            }).then((response) => {
                history.push('/dashboard');
            })
        }
    }

    return (
        <div className={'login-page'}>
            <LoginForm errors={errors} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
        </div>
    );
}

export default LoginPage;