import React from "react";

function MenuItem({ name, handleClick, icon, divider }) {
    if (divider) {
        return <div className={'menu-item divider'}/>;
    }

    return (
        <div className={'menu-item'} onClick={handleClick}>
            {icon && <div className={'icon'}>{ icon }</div>}
            <div className={'menu-text'}>{ name }</div>
        </div>
    )
}

export default MenuItem;