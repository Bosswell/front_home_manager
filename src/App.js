import React from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';
import AuthService from './services/auth.service';
import {
    Route,
    Link,
    Switch,
    Redirect,
    useHistory,
    useLocation
} from 'react-router-dom'
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import RegisterForm from "./RegisterForm";


class App extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        };

        const data = {
            username: 'hello@world.p',
            password: 'zaq1@WSX'
        };

        // AuthService.login(data).then(function (res) {
        //   console.log(res);
        // });
    }

    render() {
        // let history = useHistory();
        //
        // let user = localStorage.getItem('user')

        return (
            <div>
                {/*<ul>*/}
                {/*  <li> <Link to="/">Home</Link> </li>*/}
                {/*  <li> <Link to="/login">Login</Link> </li>*/}
                {/*</ul>*/}
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/login" component={LoginForm}/>
                    <Route exact path="/register" component={RegisterForm}/>

                    <PrivateRoute authed={!!this.state.user} path='/dashboard' component={Dashboard} />
                    <Route path="*" component={NoMatch}/>
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
