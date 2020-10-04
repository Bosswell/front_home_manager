import React, { useEffect, useState } from "react";
import Question from "../exams/Question";
import Option from "../exams/Option";
import '../scss/exam.scss';
import { startExam, validateExam } from "../services/exam.service";
import {Button, Col, Container, Row} from "react-bootstrap";
import Countdown from 'react-countdown';
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { normalizeResponseErrors } from "../helpers/normalizers";


const basicValues = {
    code: '5f78a8f17c09e',
    examId: 1,
    username: 'Jakub Batko',
    userNUmber: 1
};

function ExamPage() {
    const [exam, setExam] = useState({
        isFinished: false,
        data: {
            name: '',
            timeout: 0,
            questions: {}
        },
        totalPoints: null,
        correctPoints: null,
        incorrectPoints: null,
        percentage: null,
        showResults: true
    });
    const [snippets, setSnippets] = useState([]);
    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            handleFinish();
        } else {
            return <span>{minutes}:{seconds}{seconds < 10 ? '0' : ''}</span>;
        }
    };

    useEffect(() => {
        startExam(basicValues).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

            const exam = response.data.exam;
            setExam(prevState => ({
                ...prevState,
                data: exam,
            }));
            setSnippets(exam.questions.map((question) => {
                return {
                    questionId: question.id,
                    checkedOptions: []
                }
            }))
            setUserId(response.data.userId);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const questions = exam.data.questions.length ? exam.data.questions.map((question, index) => {
        return (
            <Question query={question.query} index={index + 1}>
                {question.options.length !== 0 &&
                    question.options.map((option) => {
                        return <Option
                            correctOptions={question.correctOptions ?? {}}
                            checkedOptions={question.checkedOptions ?? {}}
                            {...option}
                            handleOnClick={() => handleOptionClick(option, question, index)}
                        />;
                    })
                }
            </Question>
        )
    }) : '';

    function handleFinish() {
        window.scroll(0,0);

        if (exam.isFinished) {
            return;
        }

        setLoading(true);

        validateExam({ userId: userId, examId: exam.data.id, snippets: snippets }).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

            const { correctOptions, totalPoints, correctPoints, incorrectPoints, percentage } = response.data;
            setExam(prevState => ({
                totalPoints: totalPoints,
                correctPoints: correctPoints,
                incorrectPoints: incorrectPoints,
                percentage: percentage,
                isFinished: true,
                showResults: prevState.showResults,
                data: {
                    name: prevState.data.name,
                    timeout: prevState.data.timeout,
                    questions: prevState.data.questions.map((question, index) => {
                        console.log(question, correctOptions, snippets);
                        return {
                            ...question,
                            correctOptions: correctOptions[question.id],
                            checkedOptions: snippets[index].checkedOptions
                        }
                    })
                }
            }))
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleOptionClick(option, question, index) {
        setSnippets((prevState) => {
            const { checkedOptions, questionId } = prevState[index];

            const checkedOption = checkedOptions.find((tmpOption) => {
                return tmpOption === option.id;
            });

            if (checkedOption) {
                const i = checkedOptions.indexOf(checkedOption);
                checkedOptions.splice(i, 1);
            } else {
                checkedOptions.push(option.id);
            }

            prevState[index] = {
                questionId: questionId,
                checkedOptions: checkedOptions,
            }

            return prevState;
        })
    }

    return (
        <div className={'exam' + (!exam.isFinished ? ' --active' : '')}>
            {loading && <Loader loading={loading}/>}

            <div className={'exam--errors'}>
                {error && <Alert messages={error} type={'danger'} headMsg={'An error has occurred'}/>}
            </div>

            <h2>{ exam.data.name }</h2>
            {exam.isFinished &&
            <div className={'exam--summary'}>
                <div><b>Summary</b></div>
                <div>Result: {exam.correctPoints}/{exam.totalPoints}, it's a {exam.percentage}%</div>
            </div>
            }
            {exam.data.timeout !== 0 && exam.isFinished !== true &&
            <Countdown
                date={Date.now() + exam.data.timeout * 60000}
                renderer={renderer}
            />
            }
            { exam.isFinished && !exam.showResults ? '' : questions }
            { !exam.isFinished && <Button variant={'success'} className={'finish-button'} onClick={handleFinish}>Finish exam</Button>}
        </div>
    )
}

export default ExamPage;