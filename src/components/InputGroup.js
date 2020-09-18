import React from "react";

function InputGroup({name, label, ...otherProps}) {
    return (
        <div className={'input-group'}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                {...otherProps}
            />
        </div>
    )
}

export default InputGroup;
