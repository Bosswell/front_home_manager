import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PRIVATE_ACCESS_TYPE = 'PRIVATE_ACCESS';
export const UNAUTHENTICATED_ACCESS_TYPE = 'UNAUTHENTICATED_ACCESS';

function WrappedRoute({ component: Component, accessType, ...props }) {
    const authed = JSON.parse(localStorage.getItem('user'));

    function renderRoute() {
        if (authed) {
            if (accessType === UNAUTHENTICATED_ACCESS_TYPE) {
                return <Redirect to={'/dashboard'}/>;
            } else if (accessType === PRIVATE_ACCESS_TYPE) {
                return <Component {...props} />;
            }
        } else {
            if (accessType === UNAUTHENTICATED_ACCESS_TYPE) {
                return <Component {...props} />;
            } else if (accessType === PRIVATE_ACCESS_TYPE) {
                return <Redirect to={'/login'}/>;
            }
        }

        throw new Error('Undefined access type');
    }

    return (
        <Route
            {...props}
            render={() => renderRoute()}
        />
    )
}

export default WrappedRoute;
