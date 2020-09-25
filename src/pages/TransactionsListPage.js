import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import { getTransactionsList, getTransactionTypes } from "../services/transaction.service";
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import {normalizeResponseErrors} from "../helpers/normalizers";
import {
    defaultSorting,
    filterDateFromOptions,
    isIncomeOptions,
    sortingOptions
} from "../constants/transactionListOptions";
import DeleteTransactionModal from "../components/DeleteTransactionModal";
import EditTransactionModal from "../components/EditTransactionModal";
import TransactionList from "../components/TransactionsList";
import "../scss/list.scss";


function TransactionsListPage() {
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
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [sortingWay, setSortingWay] = useState('');
    const [selectedItem, setSelectedItem] = useState({
        item: {},
        status: ''
    });
    const [filters, setFilters] = useState({
        transactionType: {
            id: null,
            obj: ''
        },
        dateFrom: {
            lastDays: null,
            obj: ''
        },
        transactionFlow: {
            isIncome: null,
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

            if (filterBy.hasOwnProperty('transactionTypeId')) {
                const transTypeObj = transactionTypes.find(obj => obj.value === filterBy.transactionTypeId);
                filters.transactionType = {
                    id: filterBy.transactionTypeId,
                    obj: transTypeObj ?? ''
                };
            }

            if (filterBy.hasOwnProperty('lastDays')) {
                const dateFromObj = filterDateFromOptions.find(obj => obj.value === filterBy.lastDays);
                filters.dateFrom = {
                    lastDays: filterBy.lastDays,
                    obj: dateFromObj ?? ''
                };
            }

            if (filterBy.hasOwnProperty('isIncome')) {
                const isIncome = filterBy.isIncome === 'true';
                const isIncomeObj = isIncomeOptions.find(obj => obj.value === isIncome);
                filters.transactionFlow = {
                    isIncome: isIncome,
                    obj: isIncomeObj ?? ''
                };
            }

            return {
                ...prevState,
                ...filters
            }
        })
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
            clearNotifications();

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

    useEffect(() => {
        if (selectedItem.status !== 'deleted' && selectedItem.status !== 'updated') {
            return;
        }

        function changeTransaction(prevState) {
            switch (selectedItem.status) {
                case 'deleted':
                    return prevState.results.filter((transaction) => {
                        return transaction.id !== selectedItem.item.id;
                    })
                case 'updated':
                    return prevState.results.map((transaction) => {
                        if (transaction.id === selectedItem.item.id) {
                            return selectedItem.item;
                        }

                        return transaction;
                    })
                default:
                    return prevState.results;
            }
        }

        setTransListInfo(prevState => ({
            ...prevState,
            results: changeTransaction(prevState)
        }))
    }, [selectedItem]);

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

    function handleIsIncomeFilterChange(selected) {
        setFilters(prevState => ({
            ...prevState,
            transactionFlow: {
                isIncome: selected ? selected.value : null,
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
                ...(filters.dateFrom.lastDays && {lastDays: filters.dateFrom.lastDays}),
                ...(filters.transactionFlow.isIncome !== null && {isIncome: filters.transactionFlow.isIncome})
            }
        }));
    }

    function clearNotifications() {
        setAlert(null);
        setError(null);
    }

    return (
        <Container fluid={true}>
            <TransactionList
                error={error}
                alert={alert}
                loading={loading}
                handleSortingSelectChange={handleSortingSelectChange}
                sortingWay={sortingWay}
                filters={filters}
                handlePageChange={handlePageChange}
                handleTransactionTypeFilterChange={handleTransactionTypeFilterChange}
                transactionTypes={transactionTypes}
                handleDateFromFilterChange={handleDateFromFilterChange}
                handleIsIncomeFilterChange={handleIsIncomeFilterChange}
                handleApplyFilters={handleApplyFilters}
                transListInfo={transListInfo}
                setSelectedItem={setSelectedItem}
            />

            <DeleteTransactionModal
                setAlert={setAlert}
                setError={setError}
                setLoading={setLoading}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <EditTransactionModal
                setAlert={setAlert}
                setError={setError}
                setLoading={setLoading}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                transactionTypes={transactionTypes}
            />
        </Container>
    );
}

export default TransactionsListPage;