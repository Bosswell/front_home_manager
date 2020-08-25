import React, { useState, useContext, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import './scss/form.scss';
import './scss/global.scss';

import { Switch, Route, BrowserRouter, useHistory} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import WrappedRoute, {PRIVATE_ACCESS_TYPE, UNAUTHENTICATED_ACCESS_TYPE} from "./hoc/WrappedRoute";
import authProvider from "./providers/authProvider";
import { AuthContext } from "./AuthContext";
import Menu from "./components/Menu";
import SideMenu from "./components/SideMenu";

function App() {
    const [authed, setAuthed] = useState(authProvider.checkAuth);

    return (
        <div className={'container'}>
            <AuthContext.Provider value={{ authed, setAuthed }}>
                <BrowserRouter>
                    <Switch>
                        <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path={['/login', '/']} component={LoginPage}/>
                        <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path="/register" component={RegisterPage} />
                        <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path='/dashboard' component={Dashboard} />

                        <Route path="*" component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}


export default hot(App);
