import React, {useContext, useEffect, useState} from "react";
import { PageContext } from "../../PageContext";
import useQuery from "../../hooks/useQuery";
import { useHistory } from "react-router-dom";
import useListSorter from "../../hooks/useListSorter";
import { normalizeResponseErrors } from "../../helpers/normalizers";
import HistoryListView from "./HistoryListView";
import { getHistoryList } from "../../services/exam.service";
import { defaultSorting, sortingOptions } from "../../constants/examHistoryListOptions";
import { inputNormalizer } from "../../helpers/inputNormalizer";
import isDateValid from "../../helpers/isDateValid";
import moment from 'moment';


function HistoryList() {
    const {setLoading, setError, clearNotifications, setActionButtons} = useContext(PageContext);

    const monthStartDate = new Date((new Date()).setDate(1));
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
    const defaultFilters = {
        dateStart: {
            obj: monthStartDate,
            normalized: moment(monthStartDate).format('Y/M/D H:mm:s')
        },
        isActive: false,
        userNumber: '',
        userGroup: '',
        username: '',
        examId: ''
    };
    const [filters, setFilters] = useState(defaultFilters);
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

            if (filterBy.hasOwnProperty('userGroup')) {
                filters.userGroup = filterBy.userGroup;
            }

            if (filterBy.hasOwnProperty('examId')) {
                filters.examId = filterBy.examId;
            }

            if (filterBy.hasOwnProperty('dateStart')) {
                const momentDate = moment(filterBy.dateStart);
                const date = momentDate.toDate();

                filters.dateStart = {
                    obj: date,
                    normalized: momentDate.format('Y/M/D H:mm:s')
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
                ...(filters.dateStart.normalized && {dateStart: filters.dateStart.normalized}),
                ...(filters.isActive && {isActive: filters.isActive}),
                ...(filters.userNumber && {userNumber: filters.userNumber}),
                ...(filters.userGroup && {userGroup: filters.userGroup}),
                ...(filters.username && {username: filters.username}),
                ...(filters.examId && {examId: filters.examId})
            }
        }));
    }

    function handleStartDateChange(date) {
        setFilters(prevState => ({
            ...prevState,
            dateStart: {
                obj: date,
                normalized: moment(date).format('Y/M/D H:mm:s')
            }
        }));
    }

    function handleIsActiveChange() {
        setFilters(prevState => ({
            ...prevState,
            isActive: !prevState.isActive
        }));
    }

    function handleFilterInputChange({ target }) {
        setFilters(prevState => {
            return Object.assign({}, prevState, inputNormalizer(target));
        })
    }

    function handleClearFilters() {
        setFilters(defaultFilters);
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
            handleFilterInputChange={handleFilterInputChange}
            handleClearFilters={handleClearFilters}
        />
    )
}

export default HistoryList;