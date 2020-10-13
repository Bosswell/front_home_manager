import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

export const addOption = (data) => {
    return axios
        .post(host + '/option', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const deleteOption = (id) => {
    return axios.delete(host + `/option/delete/${id}`)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const getOption = (id) => {
    return axios.get(host + `/option/${id}`)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const updateOption = (option) => {
    return axios.put(host + `/option/update`, { ...option })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}