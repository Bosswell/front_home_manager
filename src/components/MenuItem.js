import React from "react";

function MenuItem({ name, handleClick, icon }) {
    return (
        <div className={'menu-item'} onClick={handleClick}>
            {icon && <div className={'icon'}>{ icon }</div>}
            <div className={'menu-text'}>{ name }</div>
        </div>
    )
}

export default MenuItem;