import React, {useContext, useState} from "react";
import "../scss/menu.scss";
import MenuLeft from "./MenuLeft";
import HamburgerMenu from "react-hamburger-menu";
import MenuItem from "./MenuItem";
import MenuRight from "./MenuRight";
import { AuthContext } from "../AuthContext";
import { useHistory } from 'react-router-dom'
import authProvider from "../providers/authProvider";

function Menu({ children }) {
    // const { toggleMenu } = useContext(MenuContext);
    const [isOpen, setIsOpen] = useState(false);
    const {setAuthed} = useContext(AuthContext);

    const history = useHistory();

    function handleCashManager() {
        history.push('/dashboard');
    }

    function handleLogout() {
        authProvider.logout();
        setAuthed(false);
    }

    function handleHamburger() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={'menu --bg-charcoal'}>
            <MenuLeft>
                <HamburgerMenu
                    isOpen={isOpen}
                    menuClicked={handleHamburger}
                    width={18}
                    height={15}
                    strokeWidth={1}
                    rotate={0}
                    color='white'
                    borderRadius={0}
                    animationDuration={0.4}
                />
                <MenuItem name={'Cash Manager'} handleClick={handleCashManager}/>
            </MenuLeft>
            <MenuRight>
                <MenuItem name={'Logout'} handleClick={handleLogout}/>
            </MenuRight>
        </div>
    )
}

export default Menu;