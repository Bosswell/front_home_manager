import React, { useContext } from "react";
import Menu from "./Menu";
import { Spin as Hamburger } from 'hamburger-react'
import MenuItem from "./MenuItem";
import { AuthContext } from "../AuthContext";
import { useHistory } from 'react-router-dom'
import authProvider from "../providers/authProvider";
import { CgLogOut } from "react-icons/cg";
import "../scss/menu.scss";


function TopMenu({ isOpen, setOpen, isMobile }) {
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
            <Menu className={'menu-left'}>
                {isMobile && <Hamburger toggled={isOpen} toggle={setOpen} size={18}/>}
                <MenuItem name={'Home Manager'} handleClick={handleCashManager}/>
            </Menu>
            <Menu className={'menu-right'}>
                <MenuItem name={'Logout'} handleClick={handleLogout} icon={<CgLogOut/>}/>
            </Menu>
        </div>
    )
}

export default TopMenu;