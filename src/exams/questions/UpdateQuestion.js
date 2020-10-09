import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { PageContext } from "../../PageContext";
import { normalizeResponseErrors } from "../../helpers/normalizers";
import "../../scss/entity-details.scss";
import { updateQuestion } from "../../services/question.service";
import QuestionForm from "./QuestionForm";


function UpdateQuestion({ inputData, setInputData, setQuestion }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);

    function handleClickForm() {
        setLoading(true);
        updateQuestion(inputData).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();
            setQuestion(prevState => {
                return Object.assign({}, prevState, inputData);
            });

            setAlert(response.message)
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleContentChange(event, editor) {
        const data = editor.getData();

        setInputData(prevState => ({
            ...prevState,
            query: data
        }));
    }

    return (
        <QuestionForm
            inputData={inputData}
            setInputData={setInputData}
            action={'Update'}
            showHeader={false}
        />
    );
}

export default UpdateQuestion;