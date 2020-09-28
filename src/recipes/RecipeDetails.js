import React, {useContext, useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import { deleteRecipe, updateRecipe } from "../services/recipe.service";
import { normalizeResponseErrors } from "../helpers/normalizers";
import DeleteModal from "../components/DeleteModal";
import DetailsView from "./DetailsView";
import EditView from "./EditView";
import DetailsNav from "../components/DetailsNav";
import {PageContext} from "../PageContext";


function RecipeDetails({ setRecipeId, setRecipe, recipe, setRecipeListInfo }) {
    const {setError, setAlert, setLoading} = useContext(PageContext);

    const [showModal, setShow] = useState(false);
    const [action, setAction] = useState('view');
    const [inputData, setInputData] = useState({
        name: '',
        content: ''
    })

    useEffect(() => {
        setInputData({ ...recipe.data });
    }, [recipe])

    function handleDeleteRecipe() {
        setShow(false);

        setLoading(true);
        deleteRecipe(recipe.data.id).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
            } else {
                setAlert(response.message);
            }

            setRecipeListInfo(prevState => ({
                ...prevState,
                results: prevState.results.filter((entry) => {
                    return parseInt(entry.id) !== recipe.data.id;
                })
            }));
            setRecipe({data: {}, show: false});
        }).finally(() => {
            setLoading(false);
        })
    }

    function returnToList() {
        setRecipe(prevState => ({...prevState, show: false}))
        setRecipeId(0);
    }

    function handleContentChange(event, editor) {
        const data = editor.getData();

        setInputData(prevState => ({
            name: prevState.name,
            content: data
        }))
    }

    function handleInputChange({ target }) {
        setInputData(prevState => ({
            name: target.value,
            content: prevState.content
        }))
    }

    function handleSubmit() {
        setLoading(true);
        updateRecipe({...inputData, id: recipe.data.id}).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
            } else {
                setAlert(response.message);
                setRecipe(prevState => ({
                    show: prevState.show,
                    data: inputData
                }))
                setAction('view');
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <Row>
            <Col lg={12}>
                <DetailsNav
                    onReturn={returnToList}
                    action={action}
                    setAction={setAction}
                    onDelete={() => setShow(true)}
                />
            </Col>
            <Col lg={12}>
                <hr/>
                {action === 'view' ?
                    <DetailsView {...recipe.data}/>
                        :
                    <EditView
                        {...inputData}
                        onContentChange={handleContentChange}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                }
            </Col>

            <DeleteModal show={showModal} setShow={setShow} entityName={'recipe'} handleDelete={handleDeleteRecipe}/>
        </Row>
    );
}

export default RecipeDetails;