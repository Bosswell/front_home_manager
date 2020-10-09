import React, { useEffect, useContext } from "react";
import "../scss/list.scss";
import "../scss/form.scss";
import RecipesList from "../recipes/RecipesList";
import { PageContext } from "../PageContext";
import { DETAILS_MODE, INSERT_MODE, LIST_MODE } from "../constants/pageModes";
import CreateRecipe from "../recipes/CreateRecipe";

function RecipePage() {
    const {setTitle, mode, setActionButtons, setMode} = useContext(PageContext);

    useEffect(() => {
        setActionButtons({show: true, create: true});
        setMode(LIST_MODE);
    }, [])

    useEffect(() => {
        switch (mode) {
            case DETAILS_MODE: setTitle('Details'); break;
            case INSERT_MODE: setTitle('Create recipe'); break;
            case LIST_MODE:
            default:
                setTitle('Recipes list')
        }
    }, [mode])

    if (mode === INSERT_MODE) {
        return <CreateRecipe/>
    } else {
        return <RecipesList />;
    }
}

export default RecipePage;