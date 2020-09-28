import React, { useState } from 'react'
import LoginForm from '../authForms/LoginForm'
import Loader from '../components/Loader'
import '../scss/login-page.scss'


function LoginPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h1 className={'text-center'}>Home manager</h1>

            <div className={'page login-page'}>
                {loading && <Loader loading={loading}/>}
                <LoginForm setLoading={setLoading}/>
            </div>
        </div>
    );
}

export default LoginPage;
