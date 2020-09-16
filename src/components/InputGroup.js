import React, {Component} from "react";

class InputGroup extends Component {
    render() {
        const {name, label, ...otherProps} = this.props;

        return (
            <div className={'input-group'}>
                {label && <label htmlFor={name}>{label}</label>}
                <input
                    id={this.props.name}
                    name={name}
                    {...otherProps}
                />
            </div>
        )
    }
}

export default InputGroup;
