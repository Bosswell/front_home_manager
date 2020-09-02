import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getTransactionsSummary } from "../services/transaction.service";
import { Container, Row, Col } from 'react-bootstrap';
import { CgDetailsMore } from "react-icons/cg";
import Alert from '../components/Alert';
import { normalizeResponseErrors } from "../helpers/normalizers";


function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTransactionsSummary().then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
    
            setMonthlySummary(response.data);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <Container fluid={true}>
            {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occured'}/>}

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
                                    <div>{ item.amount } PLN</div>
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