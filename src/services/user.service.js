import axios from 'axios';
import { host } from '../config'
import { ErrorHandler } from '../helpers/errorHandler'

export const registerUser = (data) => {
    return axios
        .post(host + '/user', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const getUserQuestions = (searchBy) => {
    return axios
        .get(host + '/user/list/questions?searchBy=' + encodeURIComponent(searchBy),)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}
