import React from "react";
import InputGroup from "../InputGroup";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "react-bootstrap/Button";

function EditView({ name, content, onContentChange, onInputChange, onSubmit }) {
    return (
        <form className={'form'}>
            <InputGroup onChange={onInputChange} name={'name'} label={'Recipe name'} type={'text'} value={name}/>
            <div className={'cke-name'}>Content</div>
            <CKEditor
                editor={ ClassicEditor }
                data={ content }
                onChange={ onContentChange }
            />
            <Button variant={'success'} onClick={onSubmit}>Update</Button>
        </form>
    )
}

export default EditView;