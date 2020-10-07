import React from "react";

function ExamDetails({ exam }) {
    return (
        <div>
            <div>Id: <b>{exam.id}</b></div>
            <div>Name: <b>{exam.name}</b></div>
            <div>Code: <b>{exam.code}</b></div>
            <div>Is available? <b>{exam.isAvailable ? 'Yes' : 'No'}</b></div>
            <div>Has visible results after validation? <b>{exam.hasVisibleResult ? 'Yes' : 'No'}</b></div>
            <div>Timeout: <b>{exam.timeout}</b></div>
            <div>Mode: <b>{exam.mode}</b></div>
        </div>
    )
}

export default ExamDetails;