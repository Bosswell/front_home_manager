import React from 'react';
import {Link} from 'react-router-dom';
import InputGroup from './InputGroup';

class RegisterForm extends React.Component {
    render() {
        return (
            <div className={'register-form'}>
                <h3 className={'text-center'}>Create account in Cash Manager</h3>
                <form className={'form --vertical'}>
                    <InputGroup onChange={this.props.handleInputChange} name={'email'} type={'email'} label={'Address email'}/>
                    <InputGroup onChange={this.props.handleInputChange} name={'full-name'} type={'text'} label={'Your name'}/>
                    <InputGroup onChange={this.props.handleInputChange} name={'password'} type={'password'} label={'Password'}/>
                    <InputGroup onChange={this.props.handleInputChange} name={'password-confirm'} type={'password'} label={'Confirm password'}/>

                    <Link to={'/login'}><small className={'text-right'}>Already have an account? Click to sign in!</small></Link>

                    <button className={'--bg-charcoal --btn-full'}>Create account</button>
                </form>
            </div>
        );
    }
}

export default RegisterForm;

