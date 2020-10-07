import React from "react";
import MenuItem from "./MenuItem";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { GiCookingPot, GiRadioactive } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { useHistory } from "react-router-dom";


function SideMenu({ isOpen, setOpen, isMobile }) {
    const history = useHistory(); 

    return (
        <aside className={'side-menu' + (!isOpen ? ' hidden' : '')}>
            <MenuItem name={'Dashboard'} handleClick={() => { isMobile && setOpen(false); history.push('/dashboard') }} icon={<MdDashboard/>}/>
            <MenuItem name={'Add transaction'} handleClick={() => { isMobile && setOpen(false); history.push('/addTransaction') }} icon={<GrTransaction/>}/>
            <MenuItem name={'Transactions list '} handleClick={() => { isMobile && setOpen(false); history.push('/transactionsList') }} icon={<AiOutlineOrderedList/>}/>
            <MenuItem divider={true}/>
            <MenuItem name={'Recipes list '} handleClick={() => { isMobile && setOpen(false); history.push('/recipesList') }} icon={<GiCookingPot/>}/>
            <MenuItem divider={true}/>
            <MenuItem name={'Exams list '} handleClick={() => { isMobile && setOpen(false); history.push('/examsList') }} icon={<ImBook/>}/>
            <MenuItem name={'Exams history '} handleClick={() => { isMobile && setOpen(false); history.push('/examsHistory') }} icon={<GiRadioactive/>}/>
        </aside>
    )
}

export default SideMenu;