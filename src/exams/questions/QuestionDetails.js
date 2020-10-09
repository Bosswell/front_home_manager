import React, { useContext, useState } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import { PageContext } from "../../PageContext";
import { normalizeResponseErrors } from "../../helpers/normalizers";
import { Html5Entities } from 'html-entities';
import "../../scss/entity-details.scss";
import { addOption, deleteOption } from "../../services/options.service";
import { truncate } from "../../helpers/truncate";
import DeleteModal from "../../components/DeleteModal";
import { OPTION_DETAILS_ROUTE } from "../../constants/routes";
import OptionForm from "../options/OptionForm";


function QuestionsDetails({ question, setQuestion }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);
    const defaultInputData = {
        content: '',
        isCorrect: false
    };
    const htmlEntities = new Html5Entities();
    const [showQuestionForm, setQuestionForm] = useState(false);
    const [inputData, setInputData] = useState(defaultInputData);
    const history = useHistory();
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [clickedOptionId, setClickedOptionId] = useState(0)

    function createOption() {
        setLoading(true);
        addOption({ ...inputData,  questionId: question.id }).then((response) => {
            clearNotifications();

            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

            const { data, message, id } = response;
            setAlert(message)
            setQuestion(prevState => {
                const options = prevState.options;
                const optionAlreadyExist = options.find((option) => {
                    return option.id === id;
                })

                if (optionAlreadyExist) {
                    return prevState;
                }

                options.push(data);
                return {
                    ...prevState,
                    options: options
                }
            })
            setQuestionForm(false);
            setInputData(defaultInputData);
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleDeleteOption() {
        setLoading(true);
        setShowDeleteModal(false);

        deleteOption(clickedOptionId).then((response) => {
            clearNotifications();

            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

            setAlert(response.message);
            setQuestion(prevState => {
                return {
                    ...prevState,
                    options: prevState.options.filter((option) => {
                        return option.id !== clickedOptionId;
                    })
                }
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <Row>
                <Col lg={6}>
                    <h4>Details</h4>
                    <div>Id: <b>{question.id}</b></div>
                    <div>
                        Query:
                        <div dangerouslySetInnerHTML={({__html: question.query})}/>
                    </div>

                    <div className={'entity-entries'}>
                        <div className={'create-box'}>
                            {!showQuestionForm ?
                                <Button variant={'outline-success'} onClick={() => {setQuestionForm(true)}}>Create option</Button>
                                :
                                <OptionForm
                                    setInputData={setInputData}
                                    inputData={inputData}
                                    handleClickForm={createOption}
                                    action={'Create'}
                                    showHeader={true}
                                />
                            }
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <h4>Options</h4>
                    <ListGroup className={'entry-list'} variant="flush">
                        {question.options.map(({ content, id, isCorrect }) => {
                            const val = htmlEntities.decode(content.replace(/<[^>]+>/g, ''));

                            return (
                                <ListGroup.Item key={id} className={'item-with-action'}>
                                    <div className={'text-info'}>
                                        <span className={'pointer btn-link'} onClick={() => { history.push(OPTION_DETAILS_ROUTE + id) }}>
                                            { truncate(val, 35) }
                                        </span>
                                        <span className={isCorrect ? 'text-success' : 'text-danger'}> - {isCorrect ? 'is correct' : 'is incorrect'}</span>
                                    </div>
                                    <div className={'text-danger pointer btn-link'} onClick={() => { setClickedOptionId(id); setShowDeleteModal(true) }}>
                                        delete
                                    </div>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDeleteOption}
                entityName={'option'}
            />
        </>
    )
}

export default QuestionsDetails;