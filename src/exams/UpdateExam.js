import React, { useContext } from "react";
import { updateExam } from "../services/exam.service";
import { normalizeResponseErrors} from "../helpers/normalizers";
import ExamForm from "./ExamForm";
import { PageContext } from "../PageContext";
import { validateExamInput } from "../helpers/validateExamInput";

function UpdateExam({ inputData, setInputData, setExam }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);

    function handleClickForm() {
        const errors = validateExamInput(inputData)

        if (errors.length) {
            setError(errors);
            return;
        }

        setLoading(true);
        updateExam({ ...inputData, mode: inputData.mode.value }).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();
            setExam(prevState => {
                return Object.assign({}, prevState, { ...inputData, mode: inputData.mode.value });
            });

            setAlert(response.message)
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <ExamForm
            action={'Update'}
            inputData={inputData}
            setInputData={setInputData}
            handleClickForm={handleClickForm}
        />
    );
}

export default UpdateExam;