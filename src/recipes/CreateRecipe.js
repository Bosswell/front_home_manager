import React, { useContext, useState } from "react";
import { addRecipe } from "../services/recipe.service";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { PageContext} from "../PageContext";
import RecipeForm from "./RecipeForm";


function CreateRecipe() {
    const {setError, setAlert, setLoading} = useContext(PageContext);
    const [inputData, setInputData] = useState({
        name: '',
        content: ''
    })

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

    function handleSubmit(event) {
        event.preventDefault();

        const errors = validateInputs();
        if (errors) {
            setError(errors);
            return;
        }

        setLoading(true);
        addRecipe(inputData).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
            } else {
                setAlert(response.message);
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    function validateInputs() {
        let err = [];

        if (!inputData.name.trim()) {
            err.push('Recipe name cannot be empty')
        }

        if (!inputData.content.trim()) {
            err.push('Recipe content cannot be empty')
        }

        return err;
    }

    return (
        <RecipeForm
            {...inputData}
            onContentChange={handleContentChange}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            buttonText={'Create recipe'}
        />
    )
}

export default CreateRecipe;