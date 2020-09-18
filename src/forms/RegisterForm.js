import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import AuthService from "../services/user.service";
import Alert from "../components/Alert";
import { normalizeResponseErrors } from "../helpers/normalizers";


function RegisterForm({ setIsOk, setLoading }) {
    const [inputData, setInputData] = useState({
        'fullName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    });
    const [errors, setErrors] = useState([]);

    function handleInputChange({ target }) {
        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (inputHasErrors()) {
            return;
        }

        setLoading(true);

        AuthService.register(inputData).then((response) => {
            if (response.hasError) {
                setErrors(normalizeResponseErrors(response));
            } else {
                setIsOk(true);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    function inputHasErrors() {
        let tmpErrors = [];

        if (!inputData.fullName.trim()) {
            tmpErrors.push(['You did not enter your name ']);
        }

        if (!inputData.email.trim()) {
            tmpErrors.push(['Address email is empty']);
        }

        if (!inputData.password.trim()) {
            tmpErrors.push(['You did not enter your password']);
        }

        if (!inputData.confirmPassword.trim()) {
            tmpErrors.push(['You did not confirmed your password']);
        }

        if (inputData.confirmPassword !== inputData.password) {
            tmpErrors.push(['Your confirmed password is not the same as given password']);
        }

        if (tmpErrors.length !== 0) {
            setErrors(tmpErrors);
        }

        return tmpErrors.length !== 0;
    }

    return (
        <div className={'register-form'}>
            <h3 className={'text-center'}>Create account in Home Manager</h3>
            <form className={'form --vertical'} onSubmit={handleSubmit}>
                <InputGroup onChange={handleInputChange} name={'email'} type={'email'} label={'Address email'}/>
                <InputGroup onChange={handleInputChange} name={'fullName'} type={'text'} label={'Your name'}/>
                <InputGroup onChange={handleInputChange} name={'password'} type={'password'} label={'Password'}/>
                <InputGroup onChange={handleInputChange} name={'confirmPassword'} type={'password'} label={'Confirm password'}/>

                <Link to={'/login'}><small className={'text-right'}>Already have an account? Click to sign in!</small></Link>

                <button className={'--bg-charcoal --btn-full'}>Create account</button>
            </form>
            <br/>

            {errors.length > 0 && <Alert type={'danger'} headMsg="An errors has occurred" messages={errors}/>}
        </div>
    );
}

export default RegisterForm;
