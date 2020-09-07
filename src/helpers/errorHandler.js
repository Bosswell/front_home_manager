export const ErrorHandler = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';

            return {
                'hasError': true,
                'message': 'Invalid credentials',
                'code': 401,
                'data': [],
                'errors': ['Invalid credentials']
            }
        }

        error.response.data.hasError = true;
        return error.response.data;
    } else if (error.request) {
        // The request was made but no response was received
        return {
            'hasError': true,
            'message': 'No response was received from the server',
            'code': 500,
            'data': [],
            'errors': ['Our server is temporary unreachable']
        }
    } else {
        // Something happened in setting up the request that triggered an Error
        return {
            'hasError': true,
            'message': 'Invalid request [front error]',
            'code': 500,
            'data': [],
            'errors': []
        }
    }
}
