import React from 'react';
import { ClipLoader } from 'react-spinners';

class Loader extends React.Component {
    render() {
        return (
            <div className={'loader-container'}>
                <ClipLoader size={100} loading={this.props.loading}/>
            </div>
        )
    }
}

export default Loader;