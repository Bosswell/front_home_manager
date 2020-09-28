import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import {Col, Container, Row} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { normalizeResponseErrors } from "../helpers/normalizers";
import "../scss/list.scss";
import "../scss/form.scss";
import {getRecipe, getRecipesList} from "../services/recipe.service";
import { defaultSorting, sortingOptions } from "../constants/recipeListOptions";
import RecipeDetails from "../components/RecipeDetails";
import RecipesList from "../components/RecipesList";
import Alert from "../components/Alert";
import Loader from "../components/Loader";


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
    const [cachedRecipes, setCachedRecipe] = useState([]);
    const [recipe, setRecipe] = useState({
        show: false,
        prepared: false,
        id: 0,
        data: {}
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

    function clearNotifications() {
        setAlert(null);
        setError(null);
    }

    useEffect(() => {
        if (!recipe.show || !recipe.id) {
            return;
        }

        clearNotifications();

        let cachedRecipe = cachedRecipes.find((cachedRecipe) => {
            return cachedRecipe.id === parseInt(recipe.id);
        })

        if (cachedRecipe) {
            setRecipe(prevState => ({
                ...prevState,
                data: cachedRecipe,
                show: true,
                prepared: true
            }));
            return;
        }

        setLoading(true);
        getRecipe(recipe.id).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
            } else {
                setRecipe(prevState => ({
                    ...prevState,
                    data: response.data,
                    prepared: true
                }));
                setCachedRecipe(prevState => ([...prevState, response.data]));
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [recipe.show])

    return (
        <Container fluid={true}>
            <Row>
                <Col lg={12}>
                    {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occurred'}/>}
                    {alert && <Alert messages={alert} type={'success'} headMsg={'Success!'}/>}
                </Col>

                {loading && <Loader loading={loading}/>}
            </Row>

            {recipe.show && recipe.prepared ?
                <RecipeDetails
                    recipe={recipe}
                    setError={setError}
                    setRecipe={setRecipe}
                    setLoading={setLoading}
                    setAlert={setAlert}
                    setRecipeListInfo={setRecipeListInfo}
                /> :
                <RecipesList
                    params={params}
                    handleSearchRecipe={handleSearchRecipe}
                    handleSortingSelectChange={handleSortingSelectChange}
                    sortingWay={sortingWay}
                    recipeListInfo={recipeListInfo}
                    handlePageChange={handlePageChange}
                    setRecipe={setRecipe}
                />
            }
        </Container>
    );
}

export default RecipesListPage;