import React, { useEffect, useState } from "react";
import Question from "../exams/Question";
import Option from "../exams/Option";
import '../scss/exam.scss';
import { startExam, validateExam } from "../services/exam.service";
import { Button } from "react-bootstrap";
import Countdown from 'react-countdown';


const basicValues = {
    code: '5f78a8f17c09e',
    examId: 1,
    username: 'Jakub Batko',
    userNUmber: 1
};

function ExamPage() {
    const [exam, setExam] = useState({
        name: '',
        timeout: 0,
        questions: {}
    });
    const [snippets, setSnippets] = useState([]);
    const [userId, setUserId] = useState(0);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            handleFinish();
        } else {
            return <span>{minutes}:{seconds}{seconds < 10 ? '0' : ''}</span>;
        }
    };

    useEffect(() => {
        startExam(basicValues).then((response) => {
            const exam = response.data.exam;

            setExam(exam);
            setSnippets(exam.questions.map((question) => {
                return {
                    questionId: question.id,
                    checkedOptions: []
                }
            }))
            setUserId(response.data.userId);
        })
    }, [])

    const questions = exam.questions.length ? exam.questions.map((question, index) => {
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
        validateExam({ userId: userId, examId: exam.id, snippets: snippets }).then((response) => {
            const correctOptions = response.data.correctOptions;
            // Show correct questions if users are allowed
            setExam(prevState => ({
                ...prevState,
                questions: prevState.questions.map((question, index) => {
                    return {
                        ...question,
                        correctOptions: correctOptions[question.id],
                        checkedOptions: snippets[index].checkedOptions
                    }
                })
            }))
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
        <div className={'exam'}>
            <h2>{ exam.name }</h2>
            {exam.timeout !== 0 &&
                <Countdown
                    date={Date.now() + exam.timeout * 60000}
                    renderer={renderer}
                />
            }
            { questions }
            <Button variant={'success'} className={'finish-button'} onClick={handleFinish}>Finish exam</Button>
        </div>
    )
}

export default ExamPage;