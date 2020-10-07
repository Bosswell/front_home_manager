import React, {useState, useEffect, useContext} from "react";
import useQuery from "../hooks/useQuery";
import {deleteTransaction, getTransactionsList, getTransactionTypes} from "../services/transaction.service";
import { useHistory } from 'react-router-dom'
import { normalizeResponseErrors } from "../helpers/normalizers";
import {
    defaultSorting,
    filterDateFromOptions,
    isIncomeOptions,
    sortingOptions
} from "../constants/transactionListOptions";
import EditTransactionModal from "../transactions/EditTransactionModal";
import TransactionList from "../transactions/TransactionsList";
import "../scss/list.scss";
import DeleteModal from "../components/DeleteModal";
import useListSorter from "../hooks/useListSorter";
import { PageContext } from "../PageContext";


function TransactionsListPage() {
    const {setLoading, setError, setAlert, setTitle, clearNotifications, setActionButtons} = useContext(PageContext);

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
    const [sortingWay] = useListSorter(params, sortingOptions, defaultSorting);
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        setTitle('Transactions list');
        setActionButtons({ show: false });

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
        setShowDeleteModal(selectedItem.status === 'confirm');
    }, [selectedItem]);

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
                        if (parseInt(transaction.id) === parseInt(selectedItem.item.id)) {
                            console.log(selectedItem);
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

    function handleDeleteTransaction() {
        setSelectedItem(prevState => ({
            ...prevState,
            status: 'deleted'
        }));

        setLoading(true);

        deleteTransaction(selectedItem.item.id).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            setAlert(response.message);
            setError(null);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <TransactionList
                params={params}
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

            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDeleteTransaction}
                entityName={'transaction'}
            />

            <EditTransactionModal
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                transactionTypes={transactionTypes}
            />
        </>
    );
}

export default TransactionsListPage;