import React from "react";
import MenuItem from "./MenuItem";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { useHistory } from "react-router-dom";

function SideMenu({ isOpen }) {
    const history = useHistory(); 

    return (
        <div className={'side-menu' + (!isOpen ? ' hidden' : '')}>
            <MenuItem name={'Dashboard'} handleClick={() => history.push('/dashboard')} icon={<MdDashboard/>}/>
            <MenuItem name={'Add transaction'} handleClick={() => history.push('/addTransaction')} icon={<GrTransaction/>}/>
            <MenuItem name={'List transactions'} handleClick={() => history.push('/listTransactions')} icon={<AiOutlineOrderedList/>}/>
        </div>
    )
}

export default SideMenu;