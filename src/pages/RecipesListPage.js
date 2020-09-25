import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { normalizeResponseErrors } from "../helpers/normalizers";
import "../scss/list.scss";
import "../scss/form.scss";
import { getRecipesList } from "../services/recipe.service";
import { defaultSorting, sortingOptions } from "../constants/recipeListOptions";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";


function RecipesListPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState('');
    const query = useQuery();
    const history = useHistory();
    const [params, setParams] = useState(() => {
        try {
            return JSON.parse(query.get("options")) ?? {}
        } catch (ex) {
            return {};
        }
    });
    const [sortingWay, setSortingWay] = useState('');
    const [search, setSearch] = useState('');
    const [recipeListInfo, setRecipeListInfo] = useState({
        nbPages: 0,
        results: []
    });
    const [details, setDetails] = useState({
        show: false,
        object: {}
    });

    useEffect(() => {
        setSortingWay(() => {
            if (!params.sortBy) {
                return defaultSorting;
            }
            const {name, direction} = params.sortBy;

            return sortingOptions.find((obj) => {
                const [tmpName, tmpDirection] = obj.value.split(',');

                return name === tmpName && direction === tmpDirection;
            });
        })
    }, [params.sortBy])

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

    function handlePageChange({ selected }) {
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

    function clearNotifications() {
        setAlert(null);
        setError(null);
    }

    return (
        <Container fluid={true}>
            {details.show ?
                <RecipeDetails
                    setDetails={setDetails}
                /> :
                <RecipesList
                    params={params}
                    error={error}
                    alert={alert}
                    loading={loading}
                    handleSearchRecipe={handleSearchRecipe}
                    handleSortingSelectChange={handleSortingSelectChange}
                    sortingWay={sortingWay}
                    recipeListInfo={recipeListInfo}
                    handlePageChange={handlePageChange}
                    setDetails={setDetails}
                />
            }
        </Container>
    );
}

export default RecipesListPage;