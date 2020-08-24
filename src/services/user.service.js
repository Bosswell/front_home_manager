import axios from 'axios';
import { host } from '../config'
import { ErrorHandler } from '../helpers/errorHandler'

class UserService {
    register(data) {
        return axios
            .post(host + '/user', data)
            .then(response => {
                return response.data;
            })
            .catch(ErrorHandler);
    }
}

export default new UserService();