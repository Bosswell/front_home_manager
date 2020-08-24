import React from "react";
import MenuItem from "./MenuItem";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useHistory } from "react-router-dom";

function SideMenu() {
    const history = useHistory(); 

    return (
        <div className={'side-menu'}>
            
            <MenuItem name={'Add transaction'} handleClick={() => history.push('/dashboard')} icon={<GrTransaction/>}/>
            <MenuItem name={'List transactions'} handleClick={() => history.push('/dashboard')} icon={<AiOutlineOrderedList/>}/>
        </div>
    )
}

export default SideMenu;