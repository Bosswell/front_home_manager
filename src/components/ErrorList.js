import React from 'react';

function ErrorList({ errors }) {
    return (
        <ol className={'error-container'}>
            {errors.map((error) => {
                return <li>{error}</li>
            })}
        </ol>
    )
}

export default ErrorList;