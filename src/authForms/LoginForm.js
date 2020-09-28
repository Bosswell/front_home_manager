import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { AuthContext } from "../AuthContext";
import authProvider from "../providers/authProvider";
import Alert from "../components/Alert";
import { normalizeResponseErrors } from "../helpers/normalizers";


function LoginForm({ setLoading }) {
    const { setAuthed } = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [inputData, setInputData] = useState({
        email: 'demo@demo.com',
        password: 'demo1234'
    });

    function handleInputChange({ target }) {
        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (inputHasErrors()) {
            return;
        }

        setLoading(true);

        authProvider.login({
            username: inputData.email,
            password: inputData.password
        }).then(response => {
            setLoading(false);

            if (response && response.hasError) {
                setErrors(normalizeResponseErrors(response));
            } else {
                setAuthed(true);
            }
        })
    }

    function inputHasErrors() {
        let tmpErrors = [];

        if (!inputData.email.trim()) {
            tmpErrors.push(['Address email is empty']);
        }

        if (!inputData.password.trim()) {
            tmpErrors.push(['You did not enter your password']);
        }

        if (tmpErrors.length !== 0) {
            setErrors(tmpErrors);
        }

        return tmpErrors.length !== 0;
    }

    return (
        <div className={'login-form'}>
            <h3 className={'text-center'}>Sign in to Home Manager</h3>
            <form className={'form --vertical'} onSubmit={handleSubmit}>
                <InputGroup onChange={handleInputChange} name={'email'} type={'email'} label={'Address email'} value={inputData.email}/>
                <InputGroup onChange={handleInputChange} name={'password'} type={'password'} label={'Password'} value={inputData.password}/>
                <Link to={'/register'}><small className={'text-right'}>Don't have account yet? Click to create!</small></Link>

                <button className={'--bg-charcoal --btn-full'}>Sign in</button>
            </form>
            <br/>
            {errors.length > 0 && <Alert type={'danger'} headMsg="An errors has occurred" messages={errors}/>}
        </div>
    );

}

export default LoginForm;
