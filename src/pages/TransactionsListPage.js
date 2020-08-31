import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import Loader from "../components/Loader";
import { getTransactionsList } from "../services/transaction.service";
import { Container, Row, Col } from 'react-bootstrap';
import Alert from '../components/Alert';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom'


function TransactionsListPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const query = useQuery();
    const history = useHistory();

    const [transListInfo, setTransListInfo] = useState({
        nbPage: parseInt(query.get('page')) ?? 1,
        nbPages: 0,
        transactionTypeId: parseInt(query.get('transactionTypeId')),
        data: []
    })

    function handlePageChange({ selected }) {
        setLoading(true);

        getTransactionsList(transListInfo.nbPage, transListInfo.transactionTypeId).then(response => {
            if (response.hasError) {
                setError(response.message);
                return;
            }

            setTransListInfo({
                nbPage: selected - 1,
                nbPages: response.data.nbPages,
                transactionTypeId: null,
                data: response.data.results
            })
        }).finally(() => {
            setLoading(false);
        })

        if (Number.isNaN(selected)) {
            return;
        }

        history.push({
            pathname: '/listTransactions',
            search: '?page=' + selected
        });
    }

    return (
        <Container fluid={true}>
            {error && <Alert messages={[error]} type={'danger'} headMsg={'An error has occured'}/>}

            {loading && <Loader loading={loading}/>}
            <h3>Monthly expenses</h3>
            <Row>
                <ReactPaginate
                    onPageChange={handlePageChange}
                    pageCount={transListInfo.nbPages}
                    initialPage={transListInfo.nbPage}
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