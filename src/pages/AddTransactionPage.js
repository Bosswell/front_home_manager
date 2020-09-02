import React, {useEffect, useState} from "react";
import AddTransactionForm from "../forms/AddTransactionForm";
import Loader from "../components/Loader";
import { Container, Row, Col } from 'react-bootstrap';
import { getTransactionTypes } from "../services/transaction.service";
import Alert from "../components/Alert";


function AddTransactionPage() {
    const [loading, setLoading] = useState(true);
    const [transactionTypes, setTransactionTypes] = useState([{}]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getTransactionTypes().then(response => {
            if (response.hasError) {
                setErrors(response.errors.length ? response.errors : [response.message]);
            } else {
                setTransactionTypes(response.data);
            }

            setLoading(false);
        })
    }, []);

    return (
        <Container fluid={true}>
            {errors.length > 0 && <Alert messages={errors} type={'danger'} headMsg={'An errors has occured'}/>}
            {loading && <Loader loading={loading}/>}

            <Row>
                <Col lg={6} md={12}>
                    <h3>Create transaction</h3>
                    <AddTransactionForm setLoading={setLoading}  transactionTypes={transactionTypes}/>
                </Col>
            </Row>
        </Container>
    );
}

export default AddTransactionPage;