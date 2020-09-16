import React, {Component} from "react";

class InputGroup extends Component {
    render() {
        return (
            <div className={'input-group'}>
                {this.props.label && <label htmlFor={this.props.name}>{this.props.label}</label>}
                <input 
                    onChange={this.props.onChange} 
                    type={this.props.type} 
                    id={this.props.name} 
                    name={this.props.name} 
                    placeholder={this.props.placeholder || ''}
                    value={this.props.value ? this.props.value : ''}
                />
            </div>
        )
    }
}

export default InputGroup;
