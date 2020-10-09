import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Switch from "react-switch";
import { Button } from "react-bootstrap";

function OptionForm({ inputData, setInputData, handleClickForm, action, showHeader }) {
    function handleContentChange(event, editor) {
        const data = editor.getData();

        setInputData(prevState => ({ ...prevState, content: data}));
    }

    return (
        <form className={'form'}>
            {showHeader && <h4>{ action } option</h4>}
            <CKEditor
                editor={ ClassicEditor }
                data={ inputData.content }
                onChange={ handleContentChange }
                required={true}
            />
            <br/>
            <div>Is correct?</div>
            <Switch
                onChange={() => setInputData(prevState => ({ ...prevState, isCorrect: !prevState.isCorrect }))}
                checked={inputData.isCorrect}
                checkedIcon={false}
                uncheckedIcon={false}
            />

            <div>
                <Button variant={'success'} onClick={handleClickForm}>{ action } option</Button>
            </div>
        </form>
    )
}

export default OptionForm;