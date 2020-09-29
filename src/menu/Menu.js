import React from "react";

function Menu({ children }) {
    return (
        <div className={'menu-left'}>
            {children}
        </div>
    )
}

export default Menu;