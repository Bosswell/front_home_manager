import React from 'react';
import { ClipLoader } from 'react-spinners';

function Loader({ loading }) {
    return (
        <div className={'loader-container'}>
            <ClipLoader size={100} loading={loading}/>
        </div>
    )
}

export default Loader;
