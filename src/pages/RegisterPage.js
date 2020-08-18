import React, {useState} from 'react';
import '../scss/register-page.scss';
import RegisterForm from '../forms/RegisterForm';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';


function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [isOk, setIsOk] = useState(false);

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
        <div className={'page register-page'}>
            {loading && <Loader loading={loading}/>}
            {isOk && renderSuccess()}
            {!isOk && <RegisterForm setLoading={setLoading} setIsOk={setIsOk}/>}
        </div>
    );
}

export default RegisterPage;