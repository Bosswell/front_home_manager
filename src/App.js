import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/form.scss';
import './scss/global.scss';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TransactionsListPage from "./pages/TransactionsListPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import WrappedRoute, { PRIVATE_ACCESS_TYPE, UNAUTHENTICATED_ACCESS_TYPE } from "./hoc/WrappedRoute";
import authProvider from "./providers/authProvider";
import { AuthContext } from "./AuthContext";
import AddTransactionPage from './pages/AddTransactionPage';


function App() {
    const [authed, setAuthed] = useState(authProvider.checkAuth);

    return (
        <AuthContext.Provider value={{ authed, setAuthed }}>
            <BrowserRouter>
                <Switch>
                    <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path={['/login', '/']} component={LoginPage}/>
                    <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path="/register" component={RegisterPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path='/dashboard' component={Dashboard} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path='/addTransaction' component={AddTransactionPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path='/transactionsList' component={TransactionsListPage} />

                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}


export default hot(App);
