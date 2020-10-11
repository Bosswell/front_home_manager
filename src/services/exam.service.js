import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

// Front exam
export const startExam = (data) => {
    return axios
        .post(host + '/exam/front/start', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const validateExam = (data) => {
    return axios
        .post(host + '/exam/front/validate', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

// Back CRUD

export const getExam = (id) => {
    return axios
        .get(host + '/exam/' + id)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const addExam = (data) => {
    return axios
        .post(host + '/exam', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const getExamsList = (params) => {
    return axios
        .get(host + '/exam/list/exams', {
            params: {
                options: params
            }
        })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const deleteExam = (id) => {
    return axios.delete(host + `/exam/delete/${id}`)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const updateExam = (exam) => {
    return axios.put(host + `/exam/update`, { ...exam })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const checkExamValidity = (id) => {
    return axios
        .get(host + '/exam/check/validity/' + id)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}