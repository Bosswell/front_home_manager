import React from "react";
import { Row, Col } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { deleteRecipe } from "../services/recipe.service";
import { normalizeResponseErrors } from "../helpers/normalizers";
import InputGroup from "./InputGroup";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function RecipeDetails({ setRecipe, recipe, setLoading, setError, setAlert, setRecipeListInfo }) {
    function handleDelete() {
        setLoading(true);
        deleteRecipe(recipe.id).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
            } else {
                setAlert(response.message);
            }

            setRecipeListInfo(prevState => ({
                ...prevState,
                results: prevState.results.filter((entry) => {
                    return parseInt(entry.id) !== recipe.id;
                })
            }));
            setRecipe({id: 0, data: {}, show: false, prepared: false});
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleContentChange() {

    }

    function listView() {
        return (
            <>
                <h2>Recipe details</h2>
                <h3>{ recipe.data.name }</h3>
                <article>{ recipe.data.content }</article>
            </>
        )
    }

    function editView() {
        return (
            <form className={'form'}>
                <InputGroup name={'name'} label={'Recipe name'} type={'text'} value={recipe.data.name}/>
                <div className={'cke-name'}>Content</div>
                <CKEditor
                    editor={ ClassicEditor }
                    data={ recipe.data.content }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                />
                <Button variant={'success'}>Update</Button>
            </form>
        )
    }

    return (
        <Row>
            <Col lg={12}>
                <nav className={'details__nav'}>
                    <div className={'details__nav--back'} onClick={() => {setRecipe(prevState => ({...prevState, prepared: false, show: false}))}}>
                        <BiArrowBack/> <span>back</span>
                    </div>

                    <div className={'details__nav__actions'}>
                        <Button className={'details--action-btn'} variant={'outline-warning'}>Edit</Button>
                        <Button className={'details--action-btn'} variant={'outline-danger'} onClick={handleDelete}>Delete</Button>
                    </div>
                </nav>
            </Col>
            <Col lg={12}>
                <hr/>
                {editView()}
            </Col>
        </Row>
    );
}

export default RecipeDetails;