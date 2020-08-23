import React from "react";
import {Link} from "react-router-dom";
import AddTransactionForm from "../forms/AddTransactionForm";
import Loader from "../components/Loader";

function CreateTransactionPage() {
    return (
        <div className={'page dashboard'}>
            {loading && <Loader loading={loading}/>}

            <div>
                <Link to={'/login'}>Transaction list</Link>
            </div>
            <AddTransactionForm
                setLoading={setLoading}
            />
        </div>
    )
}

export default CreateTransactionPage;