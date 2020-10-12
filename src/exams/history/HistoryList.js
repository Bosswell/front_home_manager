import React, {useContext, useEffect, useState} from "react";
import { PageContext } from "../../PageContext";
import useQuery from "../../hooks/useQuery";
import { useHistory } from "react-router-dom";
import useListSorter from "../../hooks/useListSorter";
import { normalizeResponseErrors } from "../../helpers/normalizers";
import HistoryListView from "./HistoryListView";
import { getHistoryList } from "../../services/exam.service";
import { defaultSorting, sortingOptions } from "../../constants/examHistoryListOptions";

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
        dateStart: new Date((new Date()).setDate(1)),
        isActive: null,
        userNumber: null,
        username: null
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

            if (filterBy.hasOwnProperty('isActive')) {
                filters.isActive = filterBy.isActive;
            }

            if (filterBy.hasOwnProperty('username')) {
                filters.username = filterBy.username;
            }

            if (filterBy.hasOwnProperty('userNumber')) {
                filters.userNumber = filterBy.userNumber;
            }

            if (filterBy.hasOwnProperty('dateStart')) {
                filters.dateStart = new Date(filterBy.dateStart) * 1000;
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
                ...(filters.dateStart && {dateStart: filters.dateStart.getTime() / 1000}),
                ...(filters.isActive && {isActive: filters.isActive}),
                ...(filters.userNumber && {userNumber: filters.userNumber}),
                ...(filters.username && {username: filters.username}),
            }
        }));
    }

    function handleStartDateChange(date) {
        setFilters(prevState => ({
            ...prevState,
            dateStart: date
        }));
    }

    function handleIsActiveChange() {
        setFilters(prevState => ({
            ...prevState,
            isActive: !prevState.isActive
        }));
    }

    return (
        <HistoryListView
            params={params}
            filters={filters}
            sortingWay={sortingWay}
            handleApplyFilters={handleApplyFilters}
            handleSortingSelectChange={handleSortingSelectChange}
            handlePageChange={handlePageChange}
            historyList={historyList}
            handleStartDateChange={handleStartDateChange}
            handleIsActiveChange={handleIsActiveChange}
        />
    )
}

export default HistoryList;