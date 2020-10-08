import React, { useContext, useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { deleteExam, getExam} from "../services/exam.service";
import { PageContext } from "../PageContext";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { DETAILS_MODE, UPDATE_MODE } from "../constants/pageModes";
import ExamForm from "../exams/ExamForm";
import { defaultMode, examModes } from "../constants/examModes";
import ExamDetails from "../exams/ExamDetails";
import DeleteModal from "../components/DeleteModal";
import { EXAMS_LIST_ROUTE } from "../constants/routes";
import UpdateExam from "../exams/UpdateExam";


function ExamDetailsPage() {
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
    const [exam, setExam] = useState({
        id: null,
        name: null,
        code: null,
        isAvailable: null,
        timeout: null,
        hasVisibleResult: null,
        mode: null
    });
    const [inputData, setInputData] = useState({
        name: '',
        code: '',
        isAvailable: false,
        hasVisibleResult: false,
        mode: defaultMode,
        timeout: 0
    });
    const { id } = useParams();

    function handleDelete() {
        setShowDeleteModal(false);
        setLoading(true);
        deleteExam(id).then((response) => {
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
            case UPDATE_MODE: setTitle('Update exam'); break;
            case DETAILS_MODE:
            default:
                setTitle('')
        }
    }, [mode])

    useEffect(() => {
        setLoading(true);
        setMode(DETAILS_MODE);
        setActionButtons({delete: true, show: true, update: true});

        getExam(id).then((response) => {
            if (response.hasError) {
                setActionButtons({show: false});
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            setExam(response.data);
            setInputData({
                ...response.data,
                mode: examModes.find((mode) => {
                    return mode.value === response.data.mode;
                })
            })
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (isDeleted) {
        return <Link to={EXAMS_LIST_ROUTE}>Click to go to the exams list</Link>;
    }

    if (!exam.id) {
        return '';
    }

    return (
        <>
            {mode === UPDATE_MODE ?
                <UpdateExam setInputData={setInputData} inputData={inputData}/>
                :
                <ExamDetails exam={exam} setExam={setExam}/>
            }
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDelete}
                entityName={'exam'}
            />
        </>
    )
}

export default ExamDetailsPage;