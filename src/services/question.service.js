import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

export const getQuestion = (id) => {
    return axios
        .get(host + '/question/' + id)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const addQuestion = (data) => {
    return axios
        .post(host + '/question', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const deleteQuestion = (id) => {
    return axios.delete(host + `/question/delete/${id}`)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const updateQuestion = (question) => {
    return axios.put(host + `/question/update`, { ...question })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const unlinkQuestion = (question) => {
    return axios.post(host + `/question/unlink`, { ...question })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const linkQuestion = (question) => {
    return axios.post(host + `/question/link`, { ...question })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}