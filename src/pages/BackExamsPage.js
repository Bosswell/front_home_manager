import React, { useEffect, useContext } from "react";
import "../scss/list.scss";
import "../scss/form.scss";
import { PageContext } from "../PageContext";
import { INSERT_MODE, LIST_MODE } from "../constants/pageModes";
import CreateExam from "../exams/CreateExam"
import ExamsList from "../exams/ExamsList"


function BackExamsPage() {
    const {setTitle, mode, setActionButtons} = useContext(PageContext);

    useEffect(() => {
        setActionButtons(prevState => ({...prevState, show: true, create: true}));
    }, [])

    useEffect(() => {
        switch (mode) {
            case INSERT_MODE: setTitle('Create exam'); break;
            case LIST_MODE:
            default:
                setTitle('Exams list')
        }
    }, [mode])

    if (mode === INSERT_MODE) {
        return <CreateExam />;
    } else {
        return <ExamsList />;
    }
}

export default BackExamsPage;