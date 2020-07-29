import axios from 'axios';
import { host } from '../config'
import { errorHandler } from '../errorHandler'
// import UserService from './user.service'

class AuthService {
    login(data) {
        const options = {
            headers: { 'Content-Type': 'application/json' },
        };

        return axios
            .post(host + '/login_check', data, options)
            .catch(errorHandler)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify({token: response.data.token, UserService.get}));
                }

                return response.data;
            });
    }

    get() {
        return axios
            .get(host + '/user', )
            .catch(errorHandler)
            .then(response => {
                response.data
            });
    }

    register() {

    }

    logout() {

    }
}

export default new AuthService();