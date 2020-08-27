import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import Loader from "../components/Loader";
import { getTransactionsList } from "../services/transaction.service";
import { Container, Row, Col } from 'react-bootstrap';
import { CgDetailsMore } from "react-icons/cg";
import Alert from '../components/Alert';


function TransactionsListPage() {
    const [loading, setLoading] = useState(false);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [error, setError] = useState(null);
    const query = useQuery();;
    
    getTransactionsList().then(response => {
        console.log(response);
    });


    return (
        <Container fluid={true}>
            {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occured'}/>}

            {loading && <Loader loading={loading}/>}
            <h3>Monthly expenses</h3>
            <Row>
    
            </Row>
        </Container>
    );
}

export default TransactionsListPage;