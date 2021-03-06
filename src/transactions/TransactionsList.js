import React from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import Select from "react-select";
import { filterDateFromOptions, isIncomeOptions, sortingOptions } from "../constants/transactionListOptions";
import ReactPaginate from "react-paginate";

function TransactionList(
    {
        params,
        handleSortingSelectChange,
        sortingWay,
        filters,
        handlePageChange,
        handleTransactionTypeFilterChange,
        transactionTypes,
        handleDateFromFilterChange,
        handleIsIncomeFilterChange,
        handleApplyFilters,
        transListInfo,
        setSelectedItem
    }
) {
    return (
        <Row>
            <Col lg={12}>
                <div className={'list-filters'}>
                    <div className={'filters'}>
                        <div className={'filters--select'}>
                            <Select
                                value={filters.transactionType.obj}
                                onChange={handleTransactionTypeFilterChange}
                                options={transactionTypes}
                                placeholder={'Transaction type'}
                                isClearable={true}
                            />
                        </div>
                        <div className={'filters--select'}>
                            <Select
                                value={filters.dateFrom.obj}
                                onChange={handleDateFromFilterChange}
                                options={filterDateFromOptions}
                                placeholder={'Date from'}
                                isClearable={true}
                            />
                        </div>
                        <div className={'filters--select'}>
                            <Select
                                value={filters.transactionFlow.obj}
                                onChange={handleIsIncomeFilterChange}
                                options={isIncomeOptions}
                                placeholder={'Transaction flow'}
                                isClearable={true}
                            />
                        </div>
                        <Button className={'filters--button'} onClick={handleApplyFilters} variant="outline-dark">Apply filters</Button>
                    </div>
                    <div className={'sorting-select'}>
                        <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                    </div>
                </div>

                <ListGroup className={'entry-list'} variant="flush">
                    {!transListInfo.results.length && <div>There is no available transactions</div>}

                    {transListInfo.results.map((item) => {
                        const isIncome = parseInt(item.isIncome);

                        if (!Number.isNaN(isIncome)) {
                            item.isIncome = !!isIncome;
                        }

                        return (
                            <ListGroup.Item key={item.id}>
                                <div>Type: {item.name}</div>
                                <div>Amount: { item.amount } PLN {parseInt(item.taxPercentage) > 0 && <> with { item.taxPercentage }% TAX</>} - {item.isIncome ?
                                    <span className={'text-success'}>Income</span> :
                                    <span className={'text-danger'}>Outcome</span> }
                                </div>

                                <div>Created at: { item.created_at }</div>
                                {item.description && <div>Desc: { item.description }</div>}

                                <span onClick={() => {setSelectedItem({item: item, status: 'confirm'})}} className={'text-danger pointer btn-link'}>delete</span>
                                <span> | </span>
                                <span onClick={() => {setSelectedItem({item: item, status: 'edit'})}} className={'text-warning pointer btn-link'}>edit</span>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

                <ReactPaginate
                    onPageChange={handlePageChange}
                    disableInitialCallback={true}
                    pageCount={transListInfo.nbPages}
                    forcePage={params.nbPage ? params.nbPage - 1 : 0}
                    pageRangeDisplayed={2}
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
    )
}

export default TransactionList;