import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { PageContext } from "../PageContext";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { DETAILS_MODE, UPDATE_MODE } from "../constants/pageModes";
import DeleteModal from "../components/DeleteModal";
import {deleteOption, getOption} from "../services/options.service";
import OptionDetails from "../exams/options/OptionDetails";
import UpdateOption from "../exams/options/UpdateOption";


function OptionDetailsPage() {
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
    const [option, setOption] = useState({
        id: null,
        content: null,
        isCorrect: null,
    });
    const [inputData, setInputData] = useState({
        content: null,
        isCorrect: null
    });
    const { id } = useParams();
    const history = useHistory();

    function handleDelete() {
        setShowDeleteModal(false);
        setLoading(true);
        deleteOption(id).then((response) => {
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
            case UPDATE_MODE: setTitle('Update option'); break;
            case DETAILS_MODE:
            default:
                setTitle('Option dashboard')
        }
    }, [mode])

    useEffect(() => {
        setLoading(true);
        setMode(DETAILS_MODE);
        setActionButtons({delete: true, show: true, update: true});

        getOption(id).then((response) => {
            if (response.hasError) {
                setActionButtons({show: false});
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            const data = response.data;
            setOption(data);
            setInputData(data)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (!option.id) {
        return '';
    }

    if (isDeleted) {
        return (
            <nav className={'pointer btn-link navigation'} onClick={() => { history.goBack() }}>
                Back to question details
            </nav>
        )
    }

    return (
        <>
            <nav className={'pointer btn-link navigation'} onClick={() => { history.goBack() }}>
                Back to question details
            </nav>
            {mode === UPDATE_MODE ?
                <UpdateOption setInputData={setInputData} inputData={inputData} setOption={option}/>
                :
                <OptionDetails option={option}/>
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

export default OptionDetailsPage;