import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { deleteExam, getExam} from "../services/exam.service";
import { PageContext } from "../PageContext";
import { Col, Row } from "react-bootstrap";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { DETAILS_MODE, UPDATE_MODE } from "../constants/pageModes";
import ExamForm from "../exams/ExamForm";
import { defaultMode, examModes } from "../constants/examModes";
import ExamDetails from "../exams/ExamDetails";
import DeleteModal from "../components/DeleteModal";


function ExamDetailsPage() {
    const {setError, setAlert, setLoading, setTitle, setMode, mode, clearNotifications, setActionButtons} = useContext(PageContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
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
        setLoading(true);
        deleteExam(id).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

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
                setTitle('Exam details')
        }
    }, [mode])

    useEffect(() => {
        setLoading(true);
        setMode(DETAILS_MODE);
        setActionButtons(prevState => ({...prevState, delete: true, show: true, update: true}))

        getExam(id).then((response) => {
            if (response.hasError) {
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

    return (
        <>
            <Row>
                <Col>
                    {mode === UPDATE_MODE ? <ExamForm action={'Update'} setInputData={setInputData} inputData={inputData}/> : <ExamDetails exam={exam}/> }
                </Col>
            </Row>
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