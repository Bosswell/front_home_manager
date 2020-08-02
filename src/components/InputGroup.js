import React, {Component} from "react";

class InputGroup extends Component {
    render() {
        return (
            <div className={'input-group'}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input onChange={this.props.onChange} type={this.props.type} id={this.props.name} name={this.props.name}/>
            </div>
        )
    }
}

export default InputGroup;