import React, {useEffect, useState} from 'react';
import SideMenu from './menu/SideMenu';
import TopMenu from './menu/TopMenu';
import { isMobile } from 'react-device-detect';
import {PageContext} from "./PageContext";
import {Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { DELETE_MODE, DETAILS_MODE, INSERT_MODE, LIST_MODE, UPDATE_MODE } from "./constants/pageModes";
import Alert from "./components/Alert";
import Loader from "./components/Loader";


function PrivateLayout({ children }) {
    const [isOpen, setOpen] = useState(!isMobile);
    const [isMobileSize, setMobileSize] = useState(isMobile);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState('');
    const [title, setTitle] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [mode, setMode] = useState(DETAILS_MODE)
    const [actionButtons, setActionButtons] = useState({
        show: false,
        delete: false,
        create: false,
        update: false,
        info: {
            show: false,
            text: '',
            fn: () => {}
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        clearNotifications();
    }, [mode])

    useEffect(() => {
        manipulateView();

        function manipulateView() {
            if (window.innerWidth <= 1024 && !isMobileSize) {
                setMobileSize(true);
                setOpen(false);
            } else if (window.innerWidth > 1024 && isMobileSize) {
                setMobileSize(false);
                setOpen(true);
            }
        }

        window.addEventListener('resize', () => {
            manipulateView();
        })
    }, [isMobileSize])

    function clearNotifications() {
        setAlert(null);
        setError(null);
    }

    function renderEditButtons() {
        if (mode === UPDATE_MODE) {
            return <Button variant={'outline-info'} onClick={() => setMode(DETAILS_MODE)}>View</Button>;
        } else {
            return <Button variant={'outline-warning'} onClick={() => setMode(UPDATE_MODE)}>Edit</Button>;
        }
    }

    function renderCreateButtons() {
        if (mode === INSERT_MODE) {
            return <Button variant={'outline-info'} onClick={() => setMode(LIST_MODE)}>List items</Button>;
        } else {
            return <Button variant={'outline-success'} onClick={() => setMode(INSERT_MODE)}>Create new</Button>;
        }
    }

    return (
        <menu>
            <TopMenu isOpen={isOpen} setOpen={setOpen} isMobile={isMobileSize}/>
            <div className={'middle-section'}>
                <SideMenu isOpen={isOpen} setOpen={setOpen} isMobile={isMobileSize}/>
                <section className={'content'}>
                    <PageContext.Provider value={{setLoading, setError, setAlert, setActionButtons, setTitle, setMode, mode, setShowDeleteModal, showDeleteModal, clearNotifications}}>
                        <Container fluid={true}>
                            <Row>
                                <Col lg={12} className={'page-header'}>
                                    <h3>{title && title }</h3>

                                    {actionButtons.show &&
                                        <div className={'top__action-buttons'}>
                                            {actionButtons.update && renderEditButtons()}
                                            {actionButtons.create && renderCreateButtons()}
                                            {actionButtons.info &&
                                                <Button variant={'outline-info'} onClick={actionButtons.info.fn}>{actionButtons.info.text}</Button>
                                            }
                                            {actionButtons.delete && <Button variant={'danger'} onClick={() => { setShowDeleteModal(true); setMode(DELETE_MODE) }}>Delete</Button>}
                                        </div>
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

                            { children }
                        </Container>
                    </PageContext.Provider>
                </section>
            </div>
        </menu>
    );
}

export default PrivateLayout;