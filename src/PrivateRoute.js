import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    render() {
        return (
            <Route
                {...this.props}
                render={ (props) =>
                    this.props.authed === true
                        ? <Component {...props} />
                        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                }
            />
        )
    }
}

export default PrivateRoute;
