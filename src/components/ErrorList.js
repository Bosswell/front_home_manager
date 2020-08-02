import React from 'react';
import ErrorItem from "./ErrorItem";

class ErrorList extends React.Component {
    render() {
        return (
            <ol className={'error-container'}>
                {this.props.errors.map((error) => {
                    return <ErrorItem error={error} key={error.toString()}/>
                })}
            </ol>
        )
    }
}

export default ErrorList;