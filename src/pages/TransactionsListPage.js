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

const sortingOptions = [
    {
        label: "Amount - Ascending",
        value: "t.amount,asc"
    },
    {
        label: "Amount - Descending",
        value: "t.amount,desc"
    },
    {
        label: "Creation date - Ascending",
        value: "t.createdAt"
    },
    {
        label: "Creation date - Descending",
        value: "t.createdAt,desc"
    },
    {
        label: "Position number - Ascending",
        value: "t.id,asc"
    },
    {
        label: "Position number - Descending",
        value: "t.id, desc"
    },
    {
        label: "Transaction type - Ascending",
        value: "tt.name,asc"
    },
    {
        label: "Transaction type - Descending",
        value: "tt.name,desc"
    },
]

function TransactionsListPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const query = useQuery();
    const history = useHistory();
    const [params, setParams] = useState(JSON.parse(query.get("options")) ?? {});

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
        })
    }, []);

    useEffect(() => {
        setLoading(true);
        getTransactionsList(params).then(response => {
            if (response.hasError) {
                setError(response.errors);
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

    }, [params])

    function handlePageChange({ selected }) {
        setParams(prevState => ({
            ...prevState,
            nbPage: !Number.isNaN(selected) ? (selected - 1) : 1
        }));
    }

    function handleTransactionTypeFilterChange({ value }) {
        setParams(prevState => ({
            ...prevState,
            nbPage: 1,
            filterBy: {
                transactionTypeId: value
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

    return (
        <Container fluid={true}>
            {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occured'}/>}

            {loading && <Loader loading={loading}/>}
            <h3>Transaction list</h3>
            <div className={'list-filters'}>
                <div>
                    <div>Filters</div>
                    <div className={'filter--select'}>
                        <Select onChange={handleTransactionTypeFilterChange} options={transactionTypes} placeholder={'Transaction type'}/>
                    </div>
                </div>
                <div className={'sorting-select'}>
                    <Select onChange={handleSortingSelectChange} options={sortingOptions} placeholder={'Sort by'}/>
                </div>
            </div>
            <ListGroup variant="flush">
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
            <Row>
                <ReactPaginate
                    onPageChange={handlePageChange}
                    pageCount={transListInfo.nbPages}
                    initialPage={transListInfo.nbPage - 1}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                />
            </Row>
        </Container>
    );
}

export default TransactionsListPage;