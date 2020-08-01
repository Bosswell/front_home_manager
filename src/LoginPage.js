import React from "react";
import './scss/login-page.scss';
import LoginForm from "./components/LoginForm";

class LoginPage extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        console.log('Trying to sign in')
    }

    render() {
        return (
            <div className={'login-page'}>
                <LoginForm handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default LoginPage;