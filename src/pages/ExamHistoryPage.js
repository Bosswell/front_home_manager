import React, { useEffect, useContext } from "react";
import "../scss/list.scss";
import "../scss/form.scss";
import { PageContext } from "../PageContext";
import HistoryList from "../exams/history/HistoryList";


function ExamHistoryPage() {
    const {setTitle, mode, setActionButtons} = useContext(PageContext);

    useEffect(() => {
        setActionButtons({ show: false });
    }, [])

    useEffect(() => {
        setTitle('History dashboard')
    }, [mode])

    return <HistoryList />;
}

export default ExamHistoryPage;