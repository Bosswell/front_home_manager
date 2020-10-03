import React, {useEffect, useMemo, useState} from "react";
import Question from "../components/Question";
import Option from "../components/Option";
import '../scss/exam.scss';
import {startExam, validateExam} from "../services/exam.service";
import {Button} from "react-bootstrap";


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
    const [timeLeft, setTimeLeft] = useState(0);
    const [userId, setUserId] = useState(0);
    const [timer, setTimer] = useState({
        isOn: false,
        start: 0,
        timeout: null
    });

    function startTimer() {
        const interval = setInterval(() => {
            setTimer(prev => ({...prev, timeout: prev.timeout - 1}))
        }, 1000);

        setTimeLeft(interval);
    }

    useEffect(() => {
        if (timer.isOn) {
            if (timeLeft === 0) {
                startTimer();
            } else if (timer.timeout <= 0) {
                clearInterval(timeLeft);
                handleFinish();
            }
        }
    }, [timer, timeLeft])

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

            // const sec = ex.timeout * 60;
            // setTimer({
            //     isOn: true,
            //     start: new Date().getTime() / 1000 - sec,
            //     timeout: sec
            // })
            setTimer({
                isOn: true,
                start: new Date().getTime() / 1000 - 10,
                timeout: 5
            })
        })
    }, [])

    const questions = exam.questions.length ? exam.questions.map((question, index) => {
        return (
            <Question query={question.query} index={index + 1}>
                {question.options.length !== 0 &&
                    question.options.map((option) => {
                        return <Option content={option.content} handleOnClick={() => handleOptionClick(option, question, index)}/>;
                    })
                }
            </Question>
        )
    }) : '';

    function handleFinish() {
        validateExam({ userId: userId, examId: exam.id, snippets: snippets }).then((response) => {
            console.log(response.data);
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
            <div className={'exam--timer'}>
                { timer.timeout }
            </div>
            { questions }
            <Button variant={'success'} className={'finish-button'} onClick={handleFinish}>Finish exam</Button>
        </div>
    )
}

export default ExamPage;