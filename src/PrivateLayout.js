import React, {useEffect, useState} from 'react';
import SideMenu from './menu/SideMenu';
import TopMenu from './menu/TopMenu';
import { isMobile } from 'react-device-detect';


function PrivateLayout({ children }) {
    const [isOpen, setOpen] = useState(!isMobile);
    const [isMobileSize, setMobileSize] = useState(isMobile);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        manipulateView();

        function manipulateView() {
            if (window.innerWidth <= 1024 && !isMobileSize) {
                setMobileSize(true);
                setOpen(false);
            } else if (window.innerWidth > 1024 && isMobileSize) {
                setMobileSize(false);
                setOpen(true);
            }
        }

        window.addEventListener('resize', () => {
            manipulateView();
        })
    }, [isMobileSize])

    return (
        <menu>
            <TopMenu isOpen={isOpen} setOpen={setOpen} isMobile={isMobileSize}/>
            <div className={'middle-section'}>
                <SideMenu isOpen={isOpen} setOpen={setOpen} isMobile={isMobileSize}/>
                <section className={'content'}>
                    { children }
                </section>
            </div>
        </menu>
    );
}

export default PrivateLayout;