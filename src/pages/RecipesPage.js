import React, { useState, useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import "../scss/list.scss";
import "../scss/form.scss";
import RecipesList from "../recipes/RecipesList";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Button from "react-bootstrap/Button";
import { PageContext } from "../PageContext";
import { DETAILS_MODE, INSERT_MODE, LIST_MODE } from "../constants/pageModes";
import CreateRecipe from "../recipes/CreateRecipe";

function RecipesPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState('');

    const [title, setTitle] = useState('Recipes list');
    const [mode, setMode] = useState(LIST_MODE);

    useEffect(() => {
        switch (mode) {
            case DETAILS_MODE: setTitle('Details'); break;
            case INSERT_MODE: setTitle('Create recipe'); break;
            case LIST_MODE:
            default:
                setTitle('Recipes list')
        }
    }, [mode])

    function clearNotifications() {
        setAlert(null);
        setError(null);
    }

    return (
        <PageContext.Provider value={{setLoading, setError, setAlert, setMode, clearNotifications}}>
            <Container fluid={true}>
                <Row>
                    <Col lg={12} className={'page-header'}>
                        <h3>{ title }</h3>
                        {mode !== 'insert' ?
                            <Button variant={'outline-success'} onClick={() => setMode('insert')}>Create new</Button>
                            :
                            <Button variant={'outline-dark'} onClick={() => setMode('list')}>List recipes</Button>
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

                {mode !== 'insert' ? <RecipesList /> : <CreateRecipe/>}
            </Container>
        </PageContext.Provider>
    );
}

export default RecipesPage;