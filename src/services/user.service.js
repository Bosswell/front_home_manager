import axios from 'axios';
import { host } from '../config'
import { ErrorHandler } from '../helpers/errorHandler'

class UserService {
    register(data) {
        const options = {
            headers: { 'Content-Type': 'application/json' },
        };

        return axios
            .post(host + '/user', data, options)
            .then(response => {
                return response.data;
            })
            .catch(ErrorHandler);
    }
}

export default new UserService();