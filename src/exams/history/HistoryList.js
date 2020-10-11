import React, {useContext, useEffect, useState} from "react";
import {PageContext} from "../../PageContext";
import useQuery from "../../hooks/useQuery";
import {useHistory} from "react-router-dom";
import useListSorter from "../../hooks/useListSorter";
import {normalizeResponseErrors} from "../../helpers/normalizers";
import HistoryListView from "./HistoryListView";
import {getHistoryList} from "../../services/exam.service";
import {defaultSorting, sortingOptions} from "../../constants/examHistoryListOptions";

function HistoryList() {
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
    const [sortingWay] = useListSorter(params, sortingOptions, defaultSorting);
    const [filters, setFilters] = useState({
        dateFrom: {
            lastDays: null,
            obj: ''
        },
        transactionFlow: {
            isIncome: null,
            obj: ''
        },
        isActive: null // TODO dodać date picker
    });
    const [historyList, setHistoryList] = useState({
        nbPages: 0,
        results: []
    });

    useEffect(() => {
        setActionButtons({ show: false })
    }, [])

    useEffect(() => {
        const filterBy = params.filterBy;

        setFilters((prevState) => {
            if (!filterBy) {
                return prevState;
            }

            let filters = {};

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
    }, [params.filterBy])

    useEffect(() => {
        setLoading(true);
        getHistoryList(params).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            const {nbPages, results} = response.data;
            setHistoryList({
                nbPages: nbPages,
                results: results,
            });
        }).finally(() => {
            setLoading(false);
            history.push({
                location: 'examsHistoryList',
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
                ...(filters.dateFrom.lastDays && {lastDays: filters.dateFrom.lastDays}),
                ...(filters.transactionFlow.isIncome !== null && {isIncome: filters.transactionFlow.isIncome})
            }
        }));
    }

    return (
        <HistoryListView
            params={params}
            sortingWay={sortingWay}
            handleApplyFilters={handleApplyFilters}
            handleSortingSelectChange={handleSortingSelectChange}
            handlePageChange={handlePageChange}
            historyList={historyList}
        />
    )
}

export default HistoryList;