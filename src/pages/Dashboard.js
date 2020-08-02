import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Dashboard() {
    const history = useHistory();

    function handleLogout() {
        AuthService.logout();
        history.push('/login');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;