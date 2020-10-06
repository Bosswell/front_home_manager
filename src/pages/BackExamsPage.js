import React, { useState, useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import "../scss/list.scss";
import "../scss/form.scss";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Button from "react-bootstrap/Button";
import { PageContext } from "../PageContext";
import { INSERT_MODE, LIST_MODE } from "../constants/pageModes";
import CreateExam from "../exams/CreateExam"
import ExamsList from "../exams/ExamsList"


function BackExamsPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState('');

    const [title, setTitle] = useState('Exams list');
    const [mode, setMode] = useState(LIST_MODE);

    useEffect(() => {
        switch (mode) {
            case INSERT_MODE: setTitle('Create exam'); break;
            case LIST_MODE:
            default:
                setTitle('Exams list')
        }
    }, [mode])

    function clearNotifications() {
        setAlert(null);
        setError(null);
    }

    return (
        <PageContext.Provider value={{setLoading, setError, setAlert, clearNotifications}}>
            <Container fluid={true}>
                <Row>
                    <Col lg={12} className={'page-header'}>
                        <h3>{ title }</h3>
                        {mode !== 'insert' ?
                            <Button variant={'outline-success'} onClick={() => setMode('insert')}>Create new</Button>
                            :
                            <Button variant={'outline-dark'} onClick={() => setMode('list')}>List exams</Button>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        {error && <Alert messages={error} type={'danger'} headMsg={'An error has occurred'}/>}
                        {alert && <Alert messages={alert} type={'success'} headMsg={'Success!'}/>}

                        {loading && <Loader loading={loading}/>}
                    </Col>
                </Row>

                {mode !== 'insert' ? <ExamsList /> : <CreateExam/>}
            </Container>
        </PageContext.Provider>
    );
}

export default BackExamsPage;