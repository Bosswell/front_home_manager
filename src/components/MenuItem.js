import React from "react";

function MenuItem({ name, handleClick }) {
    return (
        <div className={'menu-item '} onClick={handleClick}>
            { name }
        </div>
    )
}

export default MenuItem;