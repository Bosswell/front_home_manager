import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddTransactionForm from "../forms/AddTransactionForm";
import Loader from "../components/Loader";
import { getTransactionsSummary } from "../services/transaction.service";
import { Container, Row, Col } from 'react-bootstrap';
import { CgDetailsMore } from "react-icons/cg";
import PanelAlert from '../components/Alert';


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
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <Container fluid={true}>
            {error && <PanelAlert messages={[error]} type={'danger'} headMsg={'An error has occured'}/>}

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
        </Container>
    );
}

export default Dashboard;