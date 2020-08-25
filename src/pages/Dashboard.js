import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import AddTransactionForm from "../forms/AddTransactionForm";
import Loader from "../components/Loader";


function Dashboard() {
    const [loading, setLoading] = useState(false);

    return (
        <div className={'dashboard'}>
            {loading && <Loader loading={loading}/>}
            <div>
                <Link to={'/login'}>Transaction list</Link>
            </div>
            <AddTransactionForm
                setLoading={setLoading}
            />
        </div>
    );
}

export default Dashboard;