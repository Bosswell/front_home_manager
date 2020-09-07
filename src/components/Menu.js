import React, {useContext, useState} from "react";
import MenuLeft from "./MenuLeft";
import { Spin as Hamburger } from 'hamburger-react'
import MenuItem from "./MenuItem";
import MenuRight from "./MenuRight";
import { AuthContext } from "../AuthContext";
import { useHistory } from 'react-router-dom'
import authProvider from "../providers/authProvider";
import { CgLogOut } from "react-icons/cg";
import "../scss/menu.scss";


function Menu({ isOpen, setOpen, isMobile, showHamburger }) {
    const { setAuthed } = useContext(AuthContext);
    const history = useHistory();

    function handleCashManager() {
        history.push('/dashboard');
    }

    function handleLogout() {
        setOpen(false);
        authProvider.logout();
        setAuthed(false);
    }

    return (
        <div className={'menu --bg-charcoal'}>
            <MenuLeft>
                {isMobile && <Hamburger toggled={isOpen} toggle={setOpen} size={18}/>}
                <MenuItem name={'Cash Manager'} handleClick={handleCashManager}/>
            </MenuLeft>
            <MenuRight>
                <MenuItem name={'Logout'} handleClick={handleLogout} icon={<CgLogOut/>}/>
            </MenuRight>
        </div>
    )
}

export default Menu;