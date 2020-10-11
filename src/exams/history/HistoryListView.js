import React from "react";
import {Button, Col, ListGroup, Row, Table} from "react-bootstrap";
import Select from "react-select";
import { filterDateFromOptions, isIncomeOptions, sortingOptions } from "../../constants/transactionListOptions";
import ReactPaginate from "react-paginate";

function HistoryListView(
    {
        params,
        handleSortingSelectChange,
        sortingWay,
        filters,
        handlePageChange,
        handleTransactionTypeFilterChange,
        handleDateFromFilterChange,
        handleIsIncomeFilterChange,
        handleApplyFilters,
        historyList
    }
) {
    return (
        <Row>
            <Col lg={12}>
                <div className={'list-filters'}>
                    <div className={'filters'}>
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

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>User nb.</th>
                            <th>Username</th>
                            <th>Exam name</th>
                            <th>Started at</th>
                            <th>Is active?</th>
                            <th>User key</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyList.results.map((item) => {
                            return (
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <ReactPaginate
                    onPageChange={handlePageChange}
                    disableInitialCallback={true}
                    pageCount={historyList.nbPages}
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

export default HistoryListView;