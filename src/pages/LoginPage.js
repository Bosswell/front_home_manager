import React, { useState } from 'react'
import LoginForm from '../forms/LoginForm'
import Loader from '../components/Loader'
import '../scss/login-page.scss'


function LoginPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h1 className={'text-center'}>Cash manager</h1>

            <div className={'page login-page'}>
                {loading && <Loader loading={loading}/>}
                <LoginForm setLoading={setLoading}/>
            </div>
        </div>
    );
}

export default LoginPage;
