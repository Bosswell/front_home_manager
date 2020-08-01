import React from 'react';
import {Link} from 'react-router-dom';
import InputGroup from './InputGroup';

class LoginForm extends React.Component {
    render() {
        return (
            <div className={'login-form --bg-silk'}>
                <h3 className={'text-center'}>Sign in to Cash Manager</h3>
                <form className={'form --vertical'}>
                    <InputGroup name={'email'} type={'email'} label={'Address email'}/>
                    <InputGroup name={'password'} type={'password'} label={'Password'}/>

                    <Link to={'/register'}><small className={'text-right'}>Don't have account yet? Click to create!</small></Link>

                    <button className={'--bg-charcoal --btn-full'} onClick={this.props.handleSubmit}>Sign in</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
