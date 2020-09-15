import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getTransactionsSummary } from "../services/transaction.service";
import { Container, Row, Col, FormControl } from 'react-bootstrap';
import { CgDetailsMore } from "react-icons/cg";
import Alert from '../components/Alert';
import { normalizeResponseErrors } from "../helpers/normalizers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date((new Date()).setDate(1)));
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        setLoading(true);
        getTransactionsSummary(startDate, endDate).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
    
            setMonthlySummary(response.data);
        }).finally(() => {
            setLoading(false);
        })
    }, [startDate, endDate]);

    return (
        <Container fluid={true}>
            {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occured'}/>}

            {loading && <Loader loading={loading}/>}
            <h3>Summary of expenses</h3>
            <Row>
                <Col lg={12}>
                    <span>Pick range</span>
                    <div className={'date-picker'}>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            customInput={<FormControl />}
                        />
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            customInput={<FormControl />}
                        />
                    </div>
                </Col>
            </Row>

            <Row className={'transaction-summary-list'}>
                {monthlySummary.length === 0 && <Col lg={12}>No transactions has been found</Col>}
                {monthlySummary.map(item => {
                    const options = {
                        filterBy: {
                            transactionTypeId: parseInt(item.transactionTypeId)
                        }
                    };
                    const totalAmount = parseFloat(item.totalAmount);
                    const income = item.income !== null ? parseFloat(item.income) : 0;
                    const outcome = Math.round((totalAmount - income) * 100) / 100;
                    const summary = Math.round((income - outcome) * 100) / 100;

                    return (
                        <Col xs={12} sm={6} md={4}>
                            <div className={'item --bg-blue'} style={{ marginTop: '10px' }} key={item.transactionTypeId}>
                                <div className={'item-title'}>
                                    { item.name }
                                </div>
                                <div className={'item-body'}>
                                    <div>{ income } PLN - <span className={'text-success'}>Income</span></div>
                                    <div>{ outcome } PLN - <span className={'text-danger'}>Outcome</span></div>
                                    <div>Summary -> <b>{ summary }</b></div>
                                    <Link to={`/transactionsList?options=${JSON.stringify(options)}`}><CgDetailsMore/> details</Link>
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