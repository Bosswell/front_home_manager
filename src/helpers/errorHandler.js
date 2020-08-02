import AuthService from '../services/auth.service';
import { useHistory } from 'react-router-dom';

export const ErrorHandler = (error) => {
    const history = useHistory();

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
            AuthService.logout();
            history.push('/login');

            return {
                'message': 'Invalid credentials',
                'code': 401,
                'data': [],
                'errors': ['Invalid credentials']
            }
        }

        return error.response.data;
    } else if (error.request) {
        // The request was made but no response was received
        return {
            'message': 'No response was received from the server',
            'code': 500,
            'data': [],
            'errors': ['Our server is temporary unreachable']
        }
    } else {
        // Something happened in setting up the request that triggered an Error
        return {
            'message': 'Invalid request [front error]',
            'code': 500,
            'data': [],
            'errors': []
        }
    }
}
