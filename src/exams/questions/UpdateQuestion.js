import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { PageContext } from "../../PageContext";
import { normalizeResponseErrors } from "../../helpers/normalizers";
import "../../scss/exam-details.scss";
import { updateQuestion } from "../../services/question.service";


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
        <form className={'form'}>
            <CKEditor
                editor={ ClassicEditor }
                data={ inputData.query }
                onChange={ handleContentChange }
                required={true}
            />
            <Button variant={'success'} onClick={handleClickForm}>Update question</Button>
        </form>
    );
}

export default UpdateQuestion;