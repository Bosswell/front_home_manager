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
import WrappedRoute, { PRIVATE_ACCESS_TYPE, PUBLIC_ACCESS_TYPE, UNAUTHENTICATED_ACCESS_TYPE } from "./hoc/WrappedRoute";
import authProvider from "./providers/authProvider";
import { AuthContext } from "./AuthContext";
import AddTransactionPage from './pages/AddTransactionPage';
import RecipesPage from "./pages/RecipesPage";
import FrontExamPage from "./pages/FrontExamPage";
import BackExamsPage from "./pages/BackExamsPage";
import ExamDetailsPage from "./pages/ExamDetailsPage";
import {
    ADD_TRANSACTION_ROUTE, DASHBOARD_ROUTE,
    EXAM_DETAILS_ROUTE, EXAM_ROUTE,
    EXAMS_LIST_ROUTE, LOGIN_ROUTE, MAIN_ROUTE,
    RECIPES_LIST_ROUTE, REGISTER_ROUTE,
    TRANSACTIONS_LIST_ROUTE
} from "./constants/routes";


function App() {
    const [authed, setAuthed] = useState(authProvider.checkAuth);

    return (
        <AuthContext.Provider value={{ authed, setAuthed }}>
            <BrowserRouter>
                <Switch>
                    <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path={[LOGIN_ROUTE, MAIN_ROUTE]} component={LoginPage}/>
                    <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path={REGISTER_ROUTE} component={RegisterPage} />
                    <WrappedRoute accessType={PUBLIC_ACCESS_TYPE} exact path={EXAM_ROUTE} component={FrontExamPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={DASHBOARD_ROUTE} component={Dashboard} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={ADD_TRANSACTION_ROUTE} component={AddTransactionPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={TRANSACTIONS_LIST_ROUTE} component={TransactionsListPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={RECIPES_LIST_ROUTE} component={RecipesPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={EXAMS_LIST_ROUTE} component={BackExamsPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={EXAM_DETAILS_ROUTE + ':id'} component={ExamDetailsPage} />

                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}


export default hot(App);
