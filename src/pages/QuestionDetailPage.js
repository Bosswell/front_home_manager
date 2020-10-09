import React, { useContext, useEffect, useState } from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { PageContext } from "../PageContext";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { DETAILS_MODE, UPDATE_MODE } from "../constants/pageModes";
import DeleteModal from "../components/DeleteModal";
import { EXAMS_LIST_ROUTE } from "../constants/routes";
import { deleteQuestion, getQuestion } from "../services/question.service";
import QuestionsDetails from "../exams/options/OptionDetails";
import UpdateQuestion from "../exams/questions/UpdateQuestion";


function QuestionDetailPage() {
    const {
        setError,
        setAlert,
        setLoading,
        setTitle,
        setMode,
        mode,
        clearNotifications,
        setActionButtons,
        setShowDeleteModal,
        showDeleteModal
    } = useContext(PageContext);

    const [isDeleted, setDeleted] = useState(false);
    const [question, setQuestion] = useState({
        id: null,
        query: null,
        questions: []
    });
    const [inputData, setInputData] = useState({
        query: ''
    });
    const { id } = useParams();
    const history = useHistory();

    function handleDelete() {
        setShowDeleteModal(false);
        setLoading(true);
        deleteQuestion(id).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            setDeleted(true);

            setAlert(response.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        switch (mode) {
            case UPDATE_MODE: setTitle('Update question'); break;
            case DETAILS_MODE:
            default:
                setTitle('')
        }
    }, [mode])

    useEffect(() => {
        setLoading(true);
        setMode(DETAILS_MODE);
        setActionButtons({delete: true, show: true, update: true});

        getQuestion(id).then((response) => {
            if (response.hasError) {
                setActionButtons({show: false});
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            setQuestion(response.data);
            setInputData(response.data)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (isDeleted) {
        return <Link to={EXAMS_LIST_ROUTE}>Click to go to the exams list</Link>;
    }

    if (!question.id) {
        return '';
    }

    return (
        <>
            <nav className={'pointer btn-link navigation'} onClick={() => { history.goBack() }}>
                Back to exam details
            </nav>

            {mode === UPDATE_MODE ?
                <UpdateQuestion inputData={inputData} setInputData={setInputData} setQuestion={setQuestion}/>
                :
                <QuestionsDetails question={question} setQuestion={setQuestion}/>
            }
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDelete}
                entityName={'question'}
            />
        </>
    )
}

export default QuestionDetailPage;