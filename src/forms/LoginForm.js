import React from 'react';
import {Link} from 'react-router-dom';
import InputGroup from '../components/InputGroup';
import ErrorList from "../components/ErrorList";

class LoginForm extends React.Component {
    render() {
        return (
            <div className={'login-form'}>
                <h3 className={'text-center'}>Sign in to Cash Manager</h3>
                <form className={'form --vertical'} onSubmit={this.props.handleSubmit}>
                    <InputGroup onChange={this.props.handleInputChange} name={'email'} type={'email'} label={'Address email'}/>
                    <InputGroup onChange={this.props.handleInputChange} name={'password'} type={'password'} label={'Password'}/>
                    <Link to={'/register'}><small className={'text-right'}>Don't have account yet? Click to create!</small></Link>

                    <button className={'--bg-charcoal --btn-full'}>Sign in</button>
                </form>
                <ErrorList errors={this.props.errors ?? []} />
            </div>
        );
    }
}

export default LoginForm;
