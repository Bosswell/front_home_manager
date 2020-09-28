import React from "react";
import { Row, Col } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { deleteRecipe } from "../services/recipe.service";
import { normalizeResponseErrors } from "../helpers/normalizers";

function RecipeDetails({ setDetails, recipe, setLoading, setError, setAlert, setRecipeListInfo }) {
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
            setDetails({obj: {}, show: false});
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <Row>
            <Col lg={12}>
                <nav className={'details__nav'}>
                    <div className={'details__nav--back'} onClick={() => {setDetails(prevState => ({...prevState, show: false}))}}>
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
                <h2>Recipe details</h2>
                <h3>{ recipe.name }</h3>
                <article>{ recipe.content }</article>
            </Col>
        </Row>
    );
}

export default RecipeDetails;