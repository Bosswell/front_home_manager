import React from "react";
import MenuItem from "./MenuItem";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { GiCookingPot, GiRadioactive } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { useHistory } from "react-router-dom";
import {
    ADD_TRANSACTION_ROUTE,
    DASHBOARD_ROUTE, EXAMS_HISTORY_ROUTE,
    EXAMS_LIST_ROUTE,
    RECIPES_LIST_ROUTE,
    TRANSACTIONS_LIST_ROUTE
} from "../constants/routes";


function SideMenu({ isOpen, setOpen, isMobile }) {
    const history = useHistory(); 

    return (
        <aside className={'side-menu' + (!isOpen ? ' hidden' : '')}>
            <MenuItem name={'Dashboard'} handleClick={() => { isMobile && setOpen(false); history.push(DASHBOARD_ROUTE) }} icon={<MdDashboard/>}/>
            <MenuItem name={'Add transaction'} handleClick={() => { isMobile && setOpen(false); history.push(ADD_TRANSACTION_ROUTE) }} icon={<GrTransaction/>}/>
            <MenuItem name={'Transactions list '} handleClick={() => { isMobile && setOpen(false); history.push(TRANSACTIONS_LIST_ROUTE) }} icon={<AiOutlineOrderedList/>}/>
            <MenuItem divider={true}/>
            <MenuItem name={'Recipes list '} handleClick={() => { isMobile && setOpen(false); history.push(RECIPES_LIST_ROUTE) }} icon={<GiCookingPot/>}/>
            <MenuItem divider={true}/>
            <MenuItem name={'Exams list '} handleClick={() => { isMobile && setOpen(false); history.push(EXAMS_LIST_ROUTE) }} icon={<ImBook/>}/>
            <MenuItem name={'Exams history '} handleClick={() => { isMobile && setOpen(false); history.push(EXAMS_HISTORY_ROUTE) }} icon={<GiRadioactive/>}/>
        </aside>
    )
}

export default SideMenu;