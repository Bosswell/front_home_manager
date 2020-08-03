import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class UnauthenticatedRoute extends Component {
    constructor(props) {
        super(props);
        this.authed = JSON.parse(localStorage.getItem('user'));
    }

    render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props => (
                    this.authed ?
                        <Redirect to='/dashboard' /> :
                        <Component {...props} />

                )}
            />
        )
    }
}

export default UnauthenticatedRoute;
