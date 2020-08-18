import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

export const getTransactionTypes = () => {
    const options = {
        headers: getBasicHeaders(),
    };

    return axios
        .get(host + '/transaction/types/list', options)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject(response);
            }

            if (response.data) {
                return response.data;
            }

            return Promise.reject(response);
        })
        .catch(ErrorHandler);
}

export const addTransaction = (data) => {
    const options = {
        headers: getBasicHeaders(),
    };

    return axios
        .post(host + '/transaction', data, options)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject(response);
            }

            if (response.data) {
                return response.data;
            }

            return Promise.reject(response);
        })
        .catch(ErrorHandler);
}

function getBasicHeaders() {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : '';

    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
}