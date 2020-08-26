import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

export const getTransactionTypes = () => {
    return axios
        .get(host + '/transaction/types/list')
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
    return axios
        .post(host + '/transaction', data)
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

export const getTransactionsSummary = () => {
    return axios
        .get(host + '/transaction/summary')
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject(response);
            }

            if (response.data) {
                return response.data;
            }

            return Promise.reject(response);
        }).catch(ErrorHandler);
}