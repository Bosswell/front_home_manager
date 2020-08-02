import React from 'react';

class ErrorItem extends React.Component {
    render() {
        return (
            <li>{this.props.error}</li>
        )
    }
}

export default ErrorItem;