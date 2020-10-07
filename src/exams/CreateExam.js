import React, { useState } from "react";
import { defaultMode, examModes } from "../constants/examModes";
import ExamForm from "./ExamForm";


function CreateExam() {
    const [inputData, setInputData] = useState({
        name: '',
        code: '',
        isAvailable: false,
        hasVisibleResult: false,
        mode: defaultMode,
        timeout: 0
    });

    return (
        <ExamForm
            action={'Create'}
            inputData={inputData}
            setInputData={setInputData}
        />
    );
}

export default CreateExam;