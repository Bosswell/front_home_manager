import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../PageContext";
import { useHistory } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import useListSorter from "../hooks/useListSorter";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { getExamsList } from "../services/exam.service";
import ExamsListView from "./ExamsListView";
import {defaultSorting, sortingOptions} from "../constants/examsListOptions";

function ExamsList() {
    const { setError, setLoading, clearNotifications } = useContext(PageContext);
    const history = useHistory();
    const query = useQuery();
    const [params, setParams] = useState(() => {
        try {
            return JSON.parse(query.get("options")) ?? {}
        } catch (ex) {
            return {};
        }
    });
    const [sortingWay] = useListSorter(params, sortingOptions, defaultSorting);

    const [examsListInfo, setExamsListInfo] = useState({
        nbPages: 0,
        results: []
    });

    useEffect(() => {
        setLoading(true);
        getExamsList(params).then(response => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            const {nbPages, results} = response.data;
            setExamsListInfo({
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

    function handleExamClick(id) {
        history.push('/exam/' + id)
    }

    return (
        <ExamsListView
            params={params}
            handleSortingSelectChange={handleSortingSelectChange}
            sortingWay={sortingWay}
            examsListInfo={examsListInfo}
            handlePageChange={handlePageChange}
            handleExamClick={handleExamClick}
        />
    )
}

export default ExamsList;