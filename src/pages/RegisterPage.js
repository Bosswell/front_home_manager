import React from 'react';
import '../scss/register-page.scss';
import RegisterForm from '../components/RegisterForm';

class RegisterPage extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        console.log('Trying to sign in')
    }

    render() {
        return (
            <div className={'register-page'}>
                <RegisterForm handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default RegisterPage;