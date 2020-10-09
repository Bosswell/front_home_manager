import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "react-bootstrap";

function QuestionForm({ inputData, setInputData, handleFormClick, action, showHeader }) {
    function handleContentChange(event, editor) {
        const data = editor.getData();

        setInputData(prevState => ({ ...prevState, query: data}));
    }

    return (
        <form className={'form'}>
            {showHeader && <h4>{ action } question</h4>}
            <CKEditor
                editor={ ClassicEditor }
                data={ inputData.query }
                onChange={ handleContentChange }
                required={true}
            />
            <Button variant={'success'} onClick={handleFormClick}>{ action } question</Button>
        </form>
    )
}

export default QuestionForm;