import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import Loader from "../components/Loader";
import {getTransactionsList, getTransactionTypes} from "../services/transaction.service";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
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
    const [filterTransactionType, setFilterTransactionType] = useState('');
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [sortingWay, setSortingWay] = useState('');

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

        setFilterTransactionType(() => {
            if (!filterBy || !filterBy.transactionTypeId) {
                return '';
            }

            return transactionTypes.find(obj => obj.value === params.filterBy.transactionTypeId);
        });

        setFilterDateFrom(() => {
            if (!filterBy || !filterBy.lastDays) {
                return '';
            }

            return filterDateFromOptions.find(obj => obj.value === params.filterBy.lastDays);
        });
    }, [transactionTypes, params.filterBy])

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
        setParams(prevState => ({
            ...prevState,
            nbPage: 1,
            filterBy: Object.assign({}, prevState.filterBy, {
                transactionTypeId: selected ? selected.value : null
            })
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

    function handleDateFromFilterChange(selected) {
        setParams(prevState => ({
            ...prevState,
            nbPage: 1,
            filterBy: Object.assign({}, prevState.filterBy, {
                lastDays: selected ? selected.value : null
            })
        }));
    }

    return (
        <Container fluid={true}>
            <Row>
                <Col lg={12}>
                    {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occured'}/>}

                    {loading && <Loader loading={loading}/>}
                    <h3>Transaction list</h3>
                    <div className={'list-filters'}>
                        <div>
                            <div>Filters</div>
                            <div className={'filter--select'}>
                                <Select
                                    value={filterTransactionType}
                                    onChange={handleTransactionTypeFilterChange}
                                    options={transactionTypes}
                                    placeholder={'Transaction type'}
                                    isClearable={true}
                                />
                                <br/>
                                <Select
                                    value={filterDateFrom}
                                    onChange={handleDateFromFilterChange}
                                    options={filterDateFromOptions}
                                    placeholder={'Date from'}
                                    isClearable={true}
                                />
                            </div>
                        </div>
                        <div className={'sorting-select'}>
                            <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                        </div>
                    </div>

                    <ListGroup className={'transaction-list'} variant="flush">
                        {transListInfo.results.map((item) => {
                            return (
                                <ListGroup.Item>
                                    <div>Type: {item.name}</div>
                                    <div>Amount: { item.amount } PLN</div>
                                    <div>Created at: { item.created_at }</div>
                                    <div>Desc: { item.description }</div>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                    <ReactPaginate
                        onPageChange={handlePageChange}
                        disableInitialCallback={true}
                        pageCount={transListInfo.nbPages}
                        initialPage={transListInfo.nbPage - 1}
                        pageRangeDisplayed={4}
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