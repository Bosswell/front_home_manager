import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };

    return config;
});


ReactDOM.render(
    <App />,   
    document.getElementById('root')
);

serviceWorker.unregister();
