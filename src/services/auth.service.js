import axios from 'axios';
import { host } from '../config'
import { errorHandler } from '../helpers/errorHandler'

class AuthService {
    login(data) {
        const options = {
            headers: { 'Content-Type': 'application/json' },
        };

        return axios
            .post(host + '/login_check', data, options)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    return Promise.reject(response);
                }

                if (response.data.token && response.data.user) {
                    localStorage.setItem('user', JSON.stringify({
                        token: response.data.token,
                        fullName: response.data.user.fullName
                    }));
                }

                return true;
            })
            .catch(errorHandler);
    }

    register() {

    }

    logout() {

    }
}

export default new AuthService();