import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import Loader from "../components/Loader";
import { getTransactionsList } from "../services/transaction.service";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Alert from '../components/Alert';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom'
import Select from "react-select";

const filterOptions = [
    {
        label: 'Artykuły spożywcze',
        value: 1
    }
]

function TransactionsListPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const query = useQuery();
    const history = useHistory();

    const [transListInfo, setTransListInfo] = useState({
        nbPage: parseInt(query.get('page')) ?? 1,
        nbPages: 0,
        sortBy: {},
        filterBy: {
            transactionTypeId: parseInt(query.get('transactionTypeId'))
        },
        results: []
    });
    let params = {
        page: 1,
        sortBy: {},
        filterBy: {}
    };

    function handlePageChange({ selected }) {
        setLoading(true);

        getTransactionsList(transListInfo.nbPage, transListInfo.filterBy.transactionTypeId).then(response => {
            if (response.hasError) {
                setError(response.errors);
                return;
            }

            setTransListInfo({
                nbPage: selected - 1,
                nbPages: response.data.nbPages,
                filterBy: {
                    transactionTypeId: null
                },
                sortBy: {},
                results: response.data.results
            })
        }).finally(() => {
            setLoading(false);
        })

        if (Number.isNaN(selected)) {
            return;
        }

        let options = {
            page: selected + 1
        };

        history.push({
            pathname: '/listTransactions',
            search: '?options=' + JSON.stringify(options)
        });
    }

    function handleFilterSelectChange({ value }) {
        params.filterBy.transactionTypeId = value;

        getTransactionsList(1, params).then(response => {
            if (response.hasError) {
                setError(response.errors);
                return;
            }

            const {nbPages, filterBy, sortBy, results} = response.data;

            setTransListInfo({
                nbPage: 1,
                nbPages: nbPages,
                filterBy: filterBy,
                sortBy:  sortBy,
                results: results
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleSortingSelectChange() {

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
                        <Select onChange={handleFilterSelectChange} options={filterOptions} placeholder={'Transaction type'}/>
                    </div>
                </div>
                <div className={'sorting-select'}>
                    <Select onChange={handleSortingSelectChange} options={[]} placeholder={'Sort by'}/>
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