import { host } from '../config'
import axios from "axios";
import { ErrorHandler } from "../helpers/errorHandler";
import jwt_decode from "jwt-decode";


const authProvider = {
    login: ({ username, password }) => {
        return axios
            .post(host + '/login_check', { username, password })
            .then(response => {
                if (response.status < 200 || response.status >= 300 || !response.data.token) {
                    return Promise.reject(response);
                }
                
                localStorage.setItem('token', response.data.token);
            })
            .catch(ErrorHandler);
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return false;
        }

        const decodedJWT = jwt_decode(token);
        const seconds = new Date().getTime() / 1000;

        return decodedJWT.exp >= seconds;
    }
}

export default authProvider;