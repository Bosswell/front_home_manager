import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/form.scss';
import './scss/global.scss';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TransactionListPage from "./pages/TransactionListPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import WrappedRoute, { PRIVATE_ACCESS_TYPE, PUBLIC_ACCESS_TYPE, UNAUTHENTICATED_ACCESS_TYPE } from "./hoc/WrappedRoute";
import authProvider from "./providers/authProvider";
import { AuthContext } from "./AuthContext";
import TransactionCreatePage from './pages/TransactionCreatePage';
import RecipePage from "./pages/RecipePage";
import ExamPublicPage from "./pages/ExamPublicPage";
import ExamPage from "./pages/ExamPage";
import ExamDetailsPage from "./pages/ExamDetailsPage";
import {
    ADD_TRANSACTION_ROUTE, DASHBOARD_ROUTE,
    EXAM_DETAILS_ROUTE, EXAM_ROUTE, EXAMS_HISTORY_ROUTE,
    EXAMS_LIST_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, OPTION_DETAILS_ROUTE, QUESTION_DETAILS_ROUTE,
    RECIPES_LIST_ROUTE, REGISTER_ROUTE,
    TRANSACTIONS_LIST_ROUTE
} from "./constants/routes";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import OptionDetailsPage from "./pages/OptionDetailsPage";
import ExamHistoryPage from "./pages/ExamHistoryPage";


function App() {
    const [authed, setAuthed] = useState(authProvider.checkAuth);

    return (
        <AuthContext.Provider value={{ authed, setAuthed }}>
            <BrowserRouter>
                <Switch>
                    <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path={[LOGIN_ROUTE, MAIN_ROUTE]} component={LoginPage}/>
                    <WrappedRoute accessType={UNAUTHENTICATED_ACCESS_TYPE} exact path={REGISTER_ROUTE} component={RegisterPage} />
                    <WrappedRoute accessType={PUBLIC_ACCESS_TYPE} exact path={EXAM_ROUTE} component={ExamPublicPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={DASHBOARD_ROUTE} component={Dashboard} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={ADD_TRANSACTION_ROUTE} component={TransactionCreatePage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={TRANSACTIONS_LIST_ROUTE} component={TransactionListPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={RECIPES_LIST_ROUTE} component={RecipePage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={EXAMS_LIST_ROUTE} component={ExamPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={EXAM_DETAILS_ROUTE + ':id'} component={ExamDetailsPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={QUESTION_DETAILS_ROUTE + ':id'} component={QuestionDetailPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={OPTION_DETAILS_ROUTE + ':id'} component={OptionDetailsPage} />
                    <WrappedRoute accessType={PRIVATE_ACCESS_TYPE} path={EXAMS_HISTORY_ROUTE} component={ExamHistoryPage} />

                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}


export default hot(App);
