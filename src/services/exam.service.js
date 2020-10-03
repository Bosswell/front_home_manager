import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

export const startExam = (data) => {
    return axios
        .post(host + '/exam/action/start', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const validateExam = (data) => {
    console.log(data);
    return axios
        .post(host + '/exam/action/validate', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}