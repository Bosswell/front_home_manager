import React from "react";
import { useParams } from "react-router-dom";


function ExamDetailsPage() {
    const { id } = useParams();

    return 'Hello ' + id;
}

export default ExamDetailsPage;