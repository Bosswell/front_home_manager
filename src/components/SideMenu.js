import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useHistory } from "react-router-dom";

function SideMenu({ isOpen }) {
    const history = useHistory(); 

    return (
        <div className={'side-menu' + (!isOpen ? ' hidden' : '')}>
            <MenuItem name={'Add transaction'} handleClick={() => history.push('/addTransaction')} icon={<GrTransaction/>}/>
            <MenuItem name={'List transactions'} handleClick={() => history.push('/dashboard')} icon={<AiOutlineOrderedList/>}/>
        </div>
    )
}

export default SideMenu;