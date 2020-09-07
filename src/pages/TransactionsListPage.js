import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import Loader from "../components/Loader";
import {getTransactionsList, getTransactionTypes} from "../services/transaction.service";
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Alert from '../components/Alert';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom'
import Select from "react-select";
import {normalizeResponseErrors} from "../helpers/normalizers";
import {defaultSorting, filterDateFromOptions, sortingOptions} from "../constants/transactionListOptions";


function TransactionsListPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const query = useQuery();
    const history = useHistory();
    const [params, setParams] = useState(JSON.parse(query.get("options")) ?? {});
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [sortingWay, setSortingWay] = useState('');
    const [filters, setFilters] = useState({
        transactionType: {
            id: null,
            obj: ''
        },
        dateFrom: {
            lastDays: null,
            obj: ''
        }
    });

    const [transListInfo, setTransListInfo] = useState({
        nbPages: 0,
        results: []
    });

    useEffect(() => {
        getTransactionTypes().then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
            } else {
                setTransactionTypes(response.data);
            }
        });
    }, []);

    useEffect(() => {
        const filterBy = params.filterBy;

        setFilters((prevState) => {
            if (!filterBy) {
                return prevState;
            }

            let filters = {};

            if (filterBy) {
                if (filterBy.transactionTypeId) {
                    const transTypeObj = transactionTypes.find(obj => obj.value === params.filterBy.transactionTypeId);
                    filters.transactionType = {
                        id: filterBy.transactionTypeId,
                        obj: transTypeObj ?? ''
                    };
                }

                if (filterBy.lastDays) {
                    const dateFromObj = filterDateFromOptions.find(obj => obj.value === params.filterBy.lastDays);
                    filters.dateFrom = {
                        lastDays: filterBy.lastDays,
                        obj: dateFromObj ?? ''
                    };
                }
            }

            return {
                ...prevState,
                ...filters
            }
        })
    }, [transactionTypes])

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
        getTransactionsList(params).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            setError(null);

            const {nbPages, results} = response.data;
            setTransListInfo({
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

    function handleTransactionTypeFilterChange(selected) {
        setFilters(prevState => ({
            ...prevState,
            transactionType: {
                id: selected ? selected.value : null,
                obj: selected
            }
        }));
    }

    function handleDateFromFilterChange(selected) {
        setFilters(prevState => ({
            ...prevState,
            dateFrom: {
                lastDays: selected ? selected.value : null,
                obj: selected
            }
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

    function handleApplyFilters() {
        setParams(prevState => ({
            ...prevState,
            nbPage: 1,
            filterBy: {
                ...(filters.transactionType.id && {transactionTypeId: filters.transactionType.id}),
                ...(filters.dateFrom.lastDays && {lastDays: filters.dateFrom.lastDays})
            }
        }));
    }

    function handleOnClick(params) {
        console.log(params.key)
    }

    return (
        <Container fluid={true}>
            <Row>
                <Col lg={12}>
                    {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occurred'}/>}

                    {loading && <Loader loading={loading}/>}
                    <h3>Transaction list</h3>
                    <div className={'list-filters'}>
                        <div className={'filters'}>
                            <div className={'filters--select'}>
                                <Select
                                    value={filters.transactionType.obj}
                                    onChange={handleTransactionTypeFilterChange}
                                    options={transactionTypes}
                                    placeholder={'Transaction type'}
                                    isClearable={true}
                                />
                            </div>
                            <div className={'filters--select'}>
                                <Select
                                    value={filters.dateFrom.obj}
                                    onChange={handleDateFromFilterChange}
                                    options={filterDateFromOptions}
                                    placeholder={'Date from'}
                                    isClearable={true}
                                />
                            </div>
                            <Button className={'filters--button'} onClick={handleApplyFilters} variant="outline-dark">Apply filters</Button>
                        </div>
                        <div className={'sorting-select'}>
                            <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                        </div>
                    </div>

                    <ListGroup className={'transaction-list'} variant="flush">
                        {transListInfo.results.map((item) => {
                            return (
                                <ListGroup.Item key={item.id} onClick={handleOnClick}>
                                    <div>Type: {item.name}</div>
                                    <div>Amount: { item.amount } PLN</div>
                                    <div>Created at: { item.created_at }</div>
                                    {item.description && <div>Desc: { item.description }</div>}

                                    <a href={'/#'} className={'text-danger'}>delete</a>
                                    <span> | </span>
                                    <a href={'/#'} className={'text-warning'}>edit</a>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <ReactPaginate
                        onPageChange={handlePageChange}
                        disableInitialCallback={true}
                        pageCount={transListInfo.nbPages}
                        initialPage={transListInfo.nbPage - 1}
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

export default TransactionsListPage;