import React, {useState, useEffect} from 'react';
import '../scss/login-page.scss';
import LoginForm from '../components/LoginForm';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service'
import { ClipLoader } from "react-spinners";

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

    function handleSubmit(event) {
        event.preventDefault();
        let tmpErrors = [];

        if (inputData.email === '') {
            tmpErrors.push(['Address email is empty']);
        }

        if (inputData.password === '') {
            tmpErrors.push(['You did not enter your password']);
        }

        setErrors(tmpErrors);

        if (tmpErrors.length === 0) {
            setLoading(true);

            AuthService.login({
                username: inputData.email,
                password: inputData.password
            }).then((response) => {
                if (response.errors) {
                    setErrors(response.errors);
                }

                history.push('/dashboard');
            }).finally(() => {
                setLoading(false);
            })
        }


    }

    if (loading) {
        return (
            <div className={'loader-container'}>
                <ClipLoader size={100} loading={loading}/>
            </div>
        )
    }

    return (
        <div className={'login-page'}>
            <LoginForm errors={errors} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
        </div>
    );
}

export default LoginPage;