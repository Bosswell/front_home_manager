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

// export const updateQuestion = (question) => {
//     return axios.put(host + `/question/update`, { ...question })
//         .then((resp) => { return resp.data; })
//         .catch(ErrorHandler);
// }
//
// export const unlinkQuestion = (question) => {
//     return axios.post(host + `/question/unlink`, { ...question })
//         .then((resp) => { return resp.data; })
//         .catch(ErrorHandler);
// }
//
// export const linkQuestion = (question) => {
//     return axios.post(host + `/question/link`, { ...question })
//         .then((resp) => { return resp.data; })
//         .catch(ErrorHandler);
// }