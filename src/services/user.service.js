import axios from 'axios';
import {host} from "../config";
import {errorHandler} from "../errorHandler";

class UserService {
    getUser() {
        const options = {
            headers: { 'Content-Type': 'application/json' },
        };

        return axios
            .get(host + '/user', options)
            .catch(errorHandler)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('token', response.data.token);
                }

                return response.data;
            });
    }
}

export default new UserService();