import React, {useContext, useState} from "react";
import {Button, Col, ListGroup, Row} from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import InputGroup from "../components/InputGroup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import {addQuestion, unlinkQuestion} from "../services/question.service";
import {PageContext} from "../PageContext";
import {normalizeResponseErrors} from "../helpers/normalizers";
import { Html5Entities } from 'html-entities';


const colourOptions = [
    {
        label: 'Hello 1',
        value: 1,
    },{
        label: 'Hello 2',
        value: 2,
    },{
        label: 'Hello 3',
        value: 3,
    },
]

const filterColors = (inputValue) => {
    return colourOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterColors(inputValue));
    }, 3000);
};


function ExamDetails({ exam, setExam }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);

    const htmlEntities = new Html5Entities();
    const [inputValue, setInputValue] = useState('');
    const [showQuestionForm, setQuestionForm] = useState(false);
    const [questionQuery, setQuestionQuery] = useState('');

    const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        setInputValue(inputValue);
        return inputValue;
    };

    const truncate = (input) => input.length > 20 ? `${input.substring(0, 20)}...` : input;

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
                                onInputChange={handleInputChange}
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
                                        { truncate(query) }
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

    function createQuestion() {
        setLoading(true);
        addQuestion({ query: questionQuery, examId: exam.id }).then((response) => {
            clearNotifications();

            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

            setAlert(response.message);
            setExam(prevState => {
                const questions = [...prevState.questions];
                questions.push(response.data);

                return {
                    ...prevState,
                    questions: questions
                }
            })
            setQuestionForm(false);
            setQuestionQuery('');
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleContentChange(event, editor) {
        const data = editor.getData();

        setQuestionQuery(data);
    }
}

export default ExamDetails;