import React from "react";
import "../scss/menu.scss";

function Menu({ children }) {
    return (
        <div className={'menu --bg-charcoal'}>
            {children}
        </div>
    )
}

export default Menu;