import React, {useContext, useState} from "react";
import { defaultMode } from "../constants/examModes";
import ExamForm from "./ExamForm";
import { addExam} from "../services/exam.service";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { PageContext } from "../PageContext";
import { validateExamInput } from "../helpers/validateExamInput";


function CreateExam() {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);
    const [inputData, setInputData] = useState({
        name: '',
        code: '',
        isAvailable: false,
        hasVisibleResult: false,
        mode: defaultMode,
        timeout: 0
    });

    function handleClickForm() {
        const errors = validateExamInput(inputData)

        if (errors.length) {
            setError(errors);
            return;
        }

        setLoading(true);
        addExam({ ...inputData, mode: inputData.mode.value }).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            setAlert(response.message)
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <ExamForm
            action={'Create'}
            inputData={inputData}
            setInputData={setInputData}
            handleClickForm={handleClickForm}
        />
    );
}

export default CreateExam;