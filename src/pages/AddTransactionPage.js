import React, { useContext, useEffect, useState } from "react";
import AddTransactionForm from "../transactions/AddTransactionForm";
import { Row, Col } from 'react-bootstrap';
import { getTransactionTypes } from "../services/transaction.service";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { PageContext } from "../PageContext";


function AddTransactionPage() {
    const { setError, setLoading, clearNotifications, setActionButtons, setTitle } = useContext(PageContext);
    const [transactionTypes, setTransactionTypes] = useState([{}]);

    useEffect(() => {
        setLoading(true);
        setActionButtons({show: false });
        setTitle('Create transaction');

        getTransactionTypes().then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();
            setTransactionTypes(response.data);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <Row>
            <Col lg={6} md={12}>
                <AddTransactionForm setLoading={setLoading}  transactionTypes={transactionTypes}/>
            </Col>
        </Row>
    );
}

export default AddTransactionPage;