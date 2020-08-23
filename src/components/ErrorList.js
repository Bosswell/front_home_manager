import React from 'react';

function ErrorList({ errors }) {
    if (errors.length === 0) {
        return '';
    }

    return (
        <ol className={'error-container alert alert-warning'}>
            {errors.map((error) => {
                return <li>{error}</li>
            })}
        </ol>
    )
}

export default ErrorList;