import React, {useCallback, useContext, useState} from "react";
import { Button, Col, Row } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import { addQuestion, linkQuestion, unlinkQuestion } from "../services/question.service";
import { PageContext } from "../PageContext";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { getUserQuestions } from "../services/user.service";
import { debounce } from "throttle-debounce";
import "../scss/entity-details.scss";
import { truncate } from "../helpers/truncate";
import QuestionForm from "./questions/QuestionForm";
import QuestionList from "./questions/QuestionList";
import { Html5Entities } from "html-entities";


function ExamDetails({ exam, setExam }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);

    const [showQuestionForm, setQuestionForm] = useState(false);
    const [inputData, setInputData] = useState({ query: '' });
    const htmlEntities = new Html5Entities();

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
        addQuestion({ ...inputData, examId: exam.id }).then((response) => {
            handleQuestionLinkResponse(response);
            setQuestionForm(false);
            setInputData({ query: '' });
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

    function handleClickCreateQuestion() {
        setQuestionForm(true);
    }

    return (
        <Row>
            <Col lg={6}>
                <h4>Details</h4>
                <div>Id: <b>{exam.id}</b></div>
                <div>Name: <b>{exam.name}</b></div>
                <div>Code: <b>{exam.code}</b></div>
                <div>Is available? <b>{exam.isAvailable ? 'Yes' : 'No'}</b></div>
                <div>Has visible results after validation? <b>{exam.hasVisibleResult ? 'Yes' : 'No'}</b></div>
                <div>Timeout: <b>{exam.timeout}</b></div>
                <div>Mode: <b>{exam.mode}</b></div>

                <div className={'entity-entries'}>
                    <div className={'async-select'}>
                        <div>Find question</div>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadOptions}
                            defaultOptions
                            onChange={onFinderChange}
                        />
                    </div>

                    <div className={'create-box'}>
                        {!showQuestionForm ?
                            <Button variant={'outline-success'} onClick={handleClickCreateQuestion}>Create question</Button>
                            :
                            <QuestionForm
                                inputData={inputData}
                                setInputData={setInputData}
                                handleFormClick={createQuestion}
                                action={'Create'}
                                showHeader={true}
                            />
                        }
                    </div>
                </div>
            </Col>
            <Col lg={6}>
                <h4>Questions</h4>
                <QuestionList questions={exam.questions} handleUnlink={handleUnlink}/>
            </Col>
        </Row>
    )
}

export default ExamDetails;