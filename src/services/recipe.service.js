import axios from 'axios';
import { host } from '../config';
import { ErrorHandler } from '../helpers/errorHandler';

export const getRecipe = (id) => {
    return axios
        .get(host + '/recipe/' + id)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const addRecipe = (data) => {
    return axios
        .post(host + '/recipe', data)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const getRecipesList = (params) => {
    return axios
        .get(host + '/recipe/action/list', {
            params: {
                options: params
            }
        })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const deleteRecipe = (id) => {
    return axios.delete(host + `${host}/recipe/delete/${id}`)
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}

export const updateRecipe = (recipe) => {
    return axios.put(host + `/recipe/update`, { ...recipe })
        .then((resp) => { return resp.data; })
        .catch(ErrorHandler);
}