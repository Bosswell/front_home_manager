import React, {useContext, useState} from 'react';
import SideMenu from './components/SideMenu';


function PrivateLayout({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <div className={'middle'}>
            <SideMenu />
            { children }
        </div>
    );
}

export default PrivateLayout;