import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
import AuthService from "./services/auth.service"

axios.interceptors.request.use(function (config) {
    const user = localStorage.getItem('user');

    if (user) {
        const decodedJWT = jwt_decode(user);
        const seconds = new Date().getTime() / 1000;

        if (decodedJWT.exp < seconds) {
            // Token has expired
            AuthService.logout();
            window.location.href = '/login';
        }
    }

    return config;
});

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
