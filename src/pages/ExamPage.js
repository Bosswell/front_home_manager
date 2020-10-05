import React, { useEffect, useState } from "react";
import '../scss/exam.scss';
import '../scss/form.scss';
import Exam from "../exams/Exam";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import InputGroup from "../components/InputGroup";
import { Button } from "react-bootstrap";
import { startExam } from "../services/exam.service";
import { normalizeResponseErrors } from "../helpers/normalizers";


function ExamPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snippets, setSnippets] = useState([]);
    const [userId, setUserId] = useState(0);
    const [inputData, setInputData] = useState({
        code: '5f7a1cea75738',
        examId: 4,
        username: 'Jakub Batko',
        userNumber: 1
    });
    const [exam, setExam] = useState({
        isStarted: false,
        isFinished: false,
        data: {
            name: '',
            timeout: 0,
            questions: {},
            showResults: true
        },
        totalPoints: null,
        correctPoints: null,
        incorrectPoints: null,
        percentage: null,
    });

    function handleInputChange({ target }) {
        setInputData(Object.assign({}, inputData, {[target.name]: target.value}))
    }

    function handleFormClick() {
        setLoading(true);
        startExam(inputData).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            setError(null);

            const exam = response.data.exam;
            exam.questions = exam.questions.sort(() => Math.random() - 0.5)

            setExam(prevState => ({
                ...prevState,
                isStarted: true,
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
    }


    return (
        <div className={'exam-container'}>
            {loading && <Loader loading={loading}/>}

            <div className={'exam--errors'}>
                {error && <Alert messages={error} type={'danger'} headMsg={'An error has occurred'}/>}
            </div>

            {!exam.isStarted && <>
                <h1 className={'text-center'}>Find your exam</h1>
                <form className={'form'}>
                    <InputGroup value={inputData.code} onChange={handleInputChange} name={'code'} label={'Exam code'}/>
                    <InputGroup value={inputData.examId} onChange={handleInputChange} type={'number'} name={'examId'} label={'Exam id'}/>
                    <InputGroup value={inputData.username} onChange={handleInputChange} name={'username'} label={'First and last name'}/>
                    <InputGroup value={inputData.userNumber} onChange={handleInputChange} name={'userNumber'} label={'Your number'}/>

                    <Button variant={'outline-dark'} onClick={handleFormClick}>Start exam</Button>
                </form>
            </>}

            {exam.isStarted && <Exam
                setLoading={setLoading}
                setError={setError}
                exam={exam}
                setExam={setExam}
                snippets={snippets}
                setSnippets={setSnippets}
                userId={userId}
            />}
        </div>
    )
}

export default ExamPage;