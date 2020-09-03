import React, {useEffect, useState} from 'react';
import SideMenu from './components/SideMenu';
import Menu from './components/Menu';
import { isMobile } from 'react-device-detect';


function PrivateLayout({ children }) {
    const [isOpen, setOpen] = useState(!isMobile);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <menu>
            <Menu isOpen={isOpen} setOpen={setOpen}/>
            <aside className={'middle-section'}>
                <SideMenu isOpen={isOpen} />
                <section className={'content'}>
                    { children }
                </section>
            </aside>
        </menu>
    );
}

export default PrivateLayout;