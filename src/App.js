import React from 'react';
import { hot } from 'react-hot-loader/root';
import './scss/form.scss';
import './scss/global.scss';

import {
    Link,
    Switch,
    Redirect,
    useHistory,
    useLocation,
    Route,
    useRoutes
} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";

import RegisterPage from "./pages/RegisterPage";
import WrappedRoute, {PRIVATE_ACCESS_TYPE, UNAUTHENTICATED_ACCESS_TYPE} from "./hoc/WrappedRoute";
import NotFound from "./pages/NotFound";


function App() {

    return (
        <div className={'container'}>
            <div>
                <h1 className={'text-center'}>Cash manager</h1>
            </div>
            <Switch>
                <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path="/" component={HomePage}/>
                <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path="/login" component={LoginPage}/>
                <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path="/register" component={RegisterPage} />
                <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path='/dashboard' component={Dashboard} />

                <Route path="*" component={NotFound}/>
            </Switch>
        </div>
    );
}

function NoMatch() {
    let location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default hot(App);
