import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

export const getTransactionTypes = () => {
    return axios
        .get(host + '/transaction/types/list')
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const addTransaction = (data) => {
    return axios
        .post(host + '/transaction', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const getTransactionsSummary = (startDate, endDate) => {
    return axios
        .get(host + '/transaction/summary', {
            params: {
                options: JSON.stringify({
                    startDate: startDate
                        .toLocaleDateString(),
                    endDate: endDate
                        .toLocaleDateString()
                })
            },
        })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const getTransactionsList = (params) => {
    return axios
        .get(host + '/transaction/list', {
            params: {
                options: params
            }
        })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const deleteTransaction = (id) => {
    return axios.delete(host + `/transaction/delete/${id}`)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}