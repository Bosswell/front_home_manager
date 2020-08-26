import React, {useContext, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import AddTransactionForm from "../forms/AddTransactionForm";
import Loader from "../components/Loader";
import { getTransactionsSummary } from '../services/transaction.service';
import { Container, Row, Col, Alert, Card, CardDeck } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CgDetailsMore } from "react-icons/cg";


function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTransactionsSummary().then(response => {
            if (response.hasError) {
                setError(response.message);
                return;
            }
    
            setMonthlySummary(response.data);
            setLoading(false);
        })
    }, []);

    return (
        <Container className={'dashboard'} fluid={true}>
            {error && <Alert variant="danger">
                            <Alert.Heading>An error has occured</Alert.Heading>
                            <p>
                                { error }
                            </p>
                        </Alert>}

            {loading && <Loader loading={loading}/>}
            <h3>Monthly expenses</h3>
            <Row>
                {monthlySummary.map(item => {
                    return (
                        <Col xs={12} sm={6} md={4}>
                            <div className={'item --bg-blue'} style={{ marginTop: '10px' }} key={item.transactionTypeId}>
                                <div className={'item-title'}>
                                    { item.name }
                                </div>
                                <div className={'item-body'}>
                                    <div>{ item.amount } { item.currency}</div>
                                    <Link to={'/dashboard'}><CgDetailsMore/> details</Link>
                                </div>
                                
                            </div>
                        </Col>
                    )
                })}
            </Row>
            {/* <AddTransactionForm
                setLoading={setLoading}
            /> */}
        </Container>
    );
}

export default Dashboard;