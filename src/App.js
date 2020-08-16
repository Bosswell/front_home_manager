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
    Route
} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";

import RegisterPage from "./pages/RegisterPage";
import UnauthenticatedRoute from "./hoc/UnauthenticatedRoute";
import PrivateRoute from "./hoc/PrivateRoute";


class App extends React.Component {
    render() {
        return (
            <div className={'container'}>
                <div>
                    <h1 className={'text-center'}>Cash manager</h1>
                </div>
                <Switch>
                    <UnauthenticatedRoute exact path="/" component={HomePage}/>
                    <UnauthenticatedRoute exact path="/login" component={LoginPage}/>
                    <UnauthenticatedRoute exact path="/register" component={RegisterPage} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />

                    <Route path="*" component={NoMatch}/>*/}
                </Switch>
            </div>
        );
    }
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
