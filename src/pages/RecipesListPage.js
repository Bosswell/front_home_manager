import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import Loader from "../components/Loader";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Alert from '../components/Alert';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom'
import Select from "react-select";
import {normalizeResponseErrors} from "../helpers/normalizers";
import "../scss/list.scss";
import "../scss/form.scss";
import {getRecipesList} from "../services/recipe.service";
import InputGroup from "../components/InputGroup";
import { defaultSorting, sortingOptions } from "../constants/recipeListOptions";


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
    const [selectedItem, setSelectedItem] = useState({
        item: {},
        status: ''
    });

    const [recipeListInfo, setRecipeListInfo] = useState({
        nbPages: 0,
        results: []
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
                results: results,
            });
        }).finally(() => {
            setLoading(false);
            history.push({
                location: 'listTransactions',
                search: '?options=' + JSON.stringify(params)
            })
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
            <Row>
                <Col lg={12}>
                    {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occurred'}/>}
                    {alert && <Alert messages={alert} type={'success'} headMsg={'Success!'}/>}

                    {loading && <Loader loading={loading}/>}
                    <h3>Recipes list</h3>
                    <div className={'list-filters'}>
                        <div className={'filters form'}>
                            <InputGroup onChange={handleSearchRecipe} name={'search'} type={'search'} placeholder={'Search ...'}/>
                        </div>
                        <div className={'sorting-select'}>
                            <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                        </div>
                    </div>

                    <ListGroup className={'transaction-list'} variant="flush">
                        {recipeListInfo.results.map((item) => {
                            return (
                                <ListGroup.Item key={item.id}>
                                    <div className={'text-info pointer btn-link'}>{ item.name }</div>
                                    <div>Created at: { item.created_at }</div>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <ReactPaginate
                        onPageChange={handlePageChange}
                        disableInitialCallback={true}
                        pageCount={recipeListInfo.nbPages}
                        initialPage={recipeListInfo.nbPage - 1}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        containerClassName={'pagination justify-content-end'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        nextClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                        disabledClassName={'disabled'}
                        activeClassName={'active'}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default RecipesListPage;