import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import AuthService from '../services/auth.service';
import AddTransactionForm from "../forms/AddTransactionForm";
import Loader from "../components/Loader";
import Alert, {SUCCESS_ALERT} from "../components/Alert";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');

    const history = useHistory();

    function handleLogout() {
        AuthService.logout();
        history.push('/login');
    }

    return (
        <div className={'page dashboard'}>
            {loading && <Loader loading={loading}/>}
            <div>
                <Link to={'/login'}>Transaction list</Link>
            </div>
            <AddTransactionForm
                setLoading={setLoading}
                setAlert={setAlert}
            />
            {alert && <Alert type={SUCCESS_ALERT} message={alert}/>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;