export const errorHandler = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data;
    } else if (error.request) {
        // The request was made but no response was received
        return {
            'message': 'No response was received from the server',
            'code': 500,
            'data': [],
            'errors': []
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
