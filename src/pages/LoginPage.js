import React from 'react';
import '../scss/login-page.scss';
import LoginForm from '../components/LoginForm';
import AuthService from '../services/auth.service';
import {Redirect, Route, useHistory} from 'react-router-dom'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors = [];

        if (this.state.email === '') {
            errors.push('Address email is empty');
        }

        if (this.state.password === '') {
            errors.push('You did not enter your password');
        }

        if (errors.length === 0) {
            AuthService.login({
                username: this.state.email,
                password: this.state.password
            }).then((response) => {
                if (response === true) {
                    this.setState({logged: true});
                } else {
                    this.setState({errors: response.errors});
                }
            })
        }

        this.setState({errors: errors});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    render() {
        if (this.state.logged === true) {
            return (
                <Route render={(props) => <Redirect to='/dashboard' />} />
            )
        }

        return (
            <div className={'login-page'}>
                <LoginForm errors={this.state.errors} handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange}/>
            </div>
        );
    }
}

export default LoginPage;