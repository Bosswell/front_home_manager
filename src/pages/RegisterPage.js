import React, {useState} from 'react';
import '../scss/register-page.scss';
import RegisterForm from '../forms/RegisterForm';
import AuthService from '../services/auth.service';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';


function RegisterPage() {
    const [inputData, setInputData] = useState({
        'fullName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isOk, setIsOk] = useState(false);

    function handleInputChange(event) {
        const target = event.target;

        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let tmpErrors = [];

        // if (inputData.fullName === '') {
        //     tmpErrors.push(['You did not enter your name ']);
        // }
        //
        // if (inputData.email === '') {
        //     tmpErrors.push(['Address email is empty']);
        // }
        //
        // if (inputData.password === '') {
        //     tmpErrors.push(['You did not enter your password']);
        // }
        //
        // if (inputData.confirmPassword === '') {
        //     tmpErrors.push(['You did not confirmed your password']);
        // }
        //
        // if (inputData.confirmPassword !== inputData.password) {
        //     tmpErrors.push(['Your confirmed password is not the same as given password']);
        // }

        if (tmpErrors.length !== 0) {
            await setErrors(tmpErrors);
            return;
        }

        setLoading(true);

        let response = await AuthService.register(inputData);

        setLoading(false);

        if (response.errors.length !== 0) {
            await setErrors(response.errors);
        } else {
            await setIsOk(true);
        }
    }

    function renderSuccess() {
        return (
            <div>
                <h3>
                    You have successfully create an account. <Link to={'/login'}>Click to go to the login page</Link>
                </h3>
            </div>
        )
    }

    return (
        <div className={'register-page'}>
            {loading && <Loader loading={loading}/>}
            {isOk && renderSuccess()}
            {!isOk && <RegisterForm errors={errors} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>}
        </div>
    );
}

export default RegisterPage;