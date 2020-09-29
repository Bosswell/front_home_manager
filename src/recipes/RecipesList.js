import React, { useContext, useEffect, useState } from "react";
import { defaultSorting, sortingOptions } from "../constants/recipeListOptions";
import RecipesListView from "./RecipesListView";
import { getRecipe, getRecipesList } from "../services/recipe.service";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { useHistory } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import RecipeDetails from "./RecipeDetails";
import { PageContext } from "../PageContext";
import useListSorter from "../helpers/useListSorter";
import {DETAILS_MODE, LIST_MODE} from "../constants/pageModes";


function RecipesList() {
    const { setError, setLoading, clearNotifications, setMode } = useContext(PageContext);
    const history = useHistory();
    const query = useQuery();
    const [params, setParams] = useState(() => {
        try {
            return JSON.parse(query.get("options")) ?? {}
        } catch (ex) {
            return {};
        }
    });
    const [sortingWay] = useListSorter(params, sortingOptions, defaultSorting);

    const [recipeListInfo, setRecipeListInfo] = useState({
        nbPages: 0,
        results: []
    });
    const [selectedRecipeId, setRecipeId] = useState(0);
    const [cachedRecipes, setCachedRecipe] = useState([]);
    const [recipe, setRecipe] = useState({
        show: false,
        data: {}
    });

    useEffect(() => {
        setMode(recipe.show ? DETAILS_MODE : LIST_MODE);
    }, [recipe])

    useEffect(() => {
        setLoading(true);
        getRecipesList(params).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            const {nbPages, results} = response.data;
            setRecipeListInfo({
                nbPages: nbPages,
                results: results
            });
        }).finally(() => {
            setLoading(false);
            history.push({
                location: 'listTransactions',
                search: '?options=' + JSON.stringify(params)
            });
        })
    }, [params, history])


    // Get and show details of selected recipe
    // Clicked recipes are cached
    useEffect(() => {
        clearNotifications();

        if (selectedRecipeId === 0) {
            setRecipe({data: {}, show: false})
            return;
        }

        const cachedRecipe = cachedRecipes.find((cachedRecipe) => {
            return cachedRecipe.id === selectedRecipeId;
        })

        if (cachedRecipe) {
            setRecipe({data: cachedRecipe, show: true});
            return;
        }

        setLoading(true);
        getRecipe(selectedRecipeId).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
            } else {
                setRecipe({data: response.data, show: true});
                setCachedRecipe(prevState => ([...prevState, response.data]));
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [selectedRecipeId, cachedRecipes]);

    function handlePageChange({ selected }) {
        clearNotifications();

        setParams(prevState => ({
            ...prevState,
            nbPage: !Number.isNaN(selected) ? (selected + 1) : 1
        }));
    }

    function handleSortingSelectChange({ value }) {
        const [name, direction] = value.split(',');

        setParams(prevState => ({
            ...prevState,
            nbPage: 1,
            sortBy: {
                name: name,
                direction: direction
            }
        }));
    }

    function handleSearchRecipe({ target }) {
        return;
    }

    if (recipe.show) {
        return (
            <RecipeDetails
                recipe={recipe}
                setRecipe={setRecipe}
                setRecipeListInfo={setRecipeListInfo}
                setRecipeId={setRecipeId}
                setCachedRecipe={setCachedRecipe}
            />
        );
    } else {
        return (
            <RecipesListView
                params={params}
                handleSearchRecipe={handleSearchRecipe}
                handleSortingSelectChange={handleSortingSelectChange}
                sortingWay={sortingWay}
                recipeListInfo={recipeListInfo}
                handlePageChange={handlePageChange}
                setRecipeId={setRecipeId}
            />
        )
    }
}

export default RecipesList;