import React, {useCallback, useContext, useState} from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import {addQuestion, linkQuestion, unlinkQuestion} from "../services/question.service";
import { PageContext } from "../PageContext";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { Html5Entities } from 'html-entities';
import { getUserQuestions } from "../services/user.service";
import { debounce } from "throttle-debounce";

const truncate = (input, positions) => input.length > positions ? `${input.substring(0, positions)}...` : input;

function ExamDetails({ exam, setExam }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);

    const htmlEntities = new Html5Entities();
    const [showQuestionForm, setQuestionForm] = useState(false);
    const [questionQuery, setQuestionQuery] = useState('');

    const loadOptions = (searchBy, callback) => {
        debounceCallback(searchBy, callback)
    };

    const debounceCallback = useCallback(
        debounce(1000, (searchVal, callback) => {
            getUserQuestions(searchVal).then((response) => {
                if (response.hasError) {
                    callback([]);
                } else {
                    const normalizedData = response.data.map(({ id, query }) => {
                        const label = htmlEntities.decode(query.replace(/<[^>]+>/g, ''));

                        return {
                            label: truncate(label, 10),
                            value: parseInt(id)
                        }
                    })

                    callback(normalizedData);
                }
            })
        }),
        []
    );

    function createQuestion() {
        setLoading(true);
        addQuestion({ query: questionQuery, examId: exam.id }).then((response) => {
            handleQuestionLinkResponse(response);
            setQuestionForm(false);
            setQuestionQuery('');
        }).finally(() => {
            setLoading(false);
        })
    }

    function onFinderChange({ value, label }) {
        setLoading(true);
        linkQuestion({ questionId: value, examId: exam.id }).then((response) => {
            response.data = {
                id: value,
                query: label
            }
            handleQuestionLinkResponse(response);
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleUnlink(questionId) {
        setLoading(true);
        unlinkQuestion({ questionId: questionId, examId: exam.id }).then((response) => {
            clearNotifications();

            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

            setAlert(response.message);
            setExam(prevState => {
                return {
                    ...prevState,
                    questions: prevState.questions.filter((question) => {
                        return question.id !== questionId;
                    })
                }
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleQuestionLinkResponse(response) {
        clearNotifications();
        if (response.hasError) {
            setError(normalizeResponseErrors(response));
            return;
        }

        const { data, message } = response;
        console.log(data);
        setAlert(message);
        setExam(prevState => {
            const questions = [...prevState.questions];
            const questionAlreadyExist = questions.find((question) => {
                return question.id === data.id;
            });

            if (questionAlreadyExist) {
                return prevState;
            }

            questions.push(data);

            return {
                ...prevState,
                questions: questions
            }
        })
    }

    return (
        <>
            <Row>
                <Col lg={6}>
                    <h3>Exam details</h3>
                    <div>Id: <b>{exam.id}</b></div>
                    <div>Name: <b>{exam.name}</b></div>
                    <div>Code: <b>{exam.code}</b></div>
                    <div>Is available? <b>{exam.isAvailable ? 'Yes' : 'No'}</b></div>
                    <div>Has visible results after validation? <b>{exam.hasVisibleResult ? 'Yes' : 'No'}</b></div>
                    <div>Timeout: <b>{exam.timeout}</b></div>
                    <div>Mode: <b>{exam.mode}</b></div>

                    <div className={'exam-questions'}>
                        <div className={'async-select'}>
                            <div>Find question</div>
                            <AsyncSelect
                                cacheOptions
                                loadOptions={loadOptions}
                                defaultOptions
                                onChange={onFinderChange}
                            />
                        </div>

                        <div className={'create-question-box'}>
                            {!showQuestionForm ?
                                <Button variant={'outline-success'} onClick={() => {setQuestionForm(true)}}>Create question</Button>
                                :
                                <form className={'form'}>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={ questionQuery }
                                        onChange={ handleContentChange }
                                        required={true}
                                    />
                                    <Button variant={'success'} onClick={() => createQuestion()}>Create question</Button>
                                </form>
                            }
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <h3>Questions</h3>
                        <ListGroup className={'entry-list'} variant="flush">
                        {exam.questions.map((question) => {
                            const query = htmlEntities.decode(question.query.replace(/<[^>]+>/g, ''));

                            return (
                                <ListGroup.Item key={question.id} className={'item-with-action'}>
                                    <div
                                        className={'text-info pointer btn-link'}
                                        onClick={() => {}}
                                    >
                                        { truncate(query, 20) }
                                    </div>
                                    <div className={'text-danger pointer'} onClick={() => handleUnlink(question.id)}>
                                        unlink
                                    </div>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </>
    )

    function handleContentChange(event, editor) {
        const data = editor.getData();

        setQuestionQuery(data);
    }
}

export default ExamDetails;