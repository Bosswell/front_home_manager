import React from "react";
import { Button, Col, FormControl, Row, Table } from "react-bootstrap";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import Switch from "react-switch";
import { sortingOptions } from "../../constants/examHistoryListOptions";
import CustomTimeInput from "../../components/CustomTimeInput";
import InputGroup from "../../components/InputGroup";
import { INT_TYPE } from "../../helpers/inputNormalizer";


function HistoryListView(
    {
        params,
        handleSortingSelectChange,
        sortingWay,
        filters,
        handlePageChange,
        handleApplyFilters,
        historyList,
        handleStartDateChange,
        handleIsActiveChange,
        handleFilterInputChange,
        handleClearFilters
    }
) {
    return (
        <Row>
            <Col lg={12}>
                <div className={'list-filters'}>
                    <div>
                        <div className={'filters'}>
                            <div>Date start</div>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={filters.dateStart.obj}
                                onChange={handleStartDateChange}
                                startDate={filters.dateStart.obj}
                                customInput={<FormControl />}
                                onFocus={(e) => e.target.readOnly = true}
                                showTimeInput
                                customTimeInput={<CustomTimeInput />}
                            />

                            <InputGroup
                                value={filters.username}
                                onChange={handleFilterInputChange}
                                name={'username'}
                                label={'Username'}
                            />

                            <div>Is active?</div>
                            <Switch
                                onChange={handleIsActiveChange}
                                checked={filters.isActive}
                                checkedIcon={false}
                                uncheckedIcon={false}
                            />

                            <Button className={'filters--button'} onClick={handleApplyFilters} variant="outline-dark">Apply filters</Button>
                            <Button className={'filters--button'} onClick={handleClearFilters} variant="outline-info">Clear</Button>
                        </div>
                        <div className={'filters'}>
                            <div>
                                <InputGroup
                                    data-scalar={INT_TYPE}
                                    value={filters.userNumber}
                                    onChange={handleFilterInputChange}
                                    name={'userNumber'}
                                    label={'User number'}
                                />
                                <InputGroup
                                    value={filters.userGroup}
                                    onChange={handleFilterInputChange}
                                    name={'userGroup'}
                                    label={'Group'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={'sorting-select'}>
                        <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                    </div>
                </div>

                <Table striped bordered hover size="sm" className={'table-list'}>
                    <thead>
                        <tr>
                            <th>User nb.</th>
                            <th>Group</th>
                            <th>Username</th>
                            <th>Exam name</th>
                            <th>Started at</th>
                            <th>Finished at</th>
                            <th>Is active?</th>
                            <th>Exam mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyList.results.map(({ user_number, username, exam_name, started_at, finished_at, is_active, mode, timeout, user_group }) => {
                            const isActive = !!parseInt(is_active);
                            const isAbandoned = Date.parse(started_at) + timeout * 60000 < (new Date().getTime()) && isActive;

                            return (
                                <tr>
                                    <td>{ user_number }</td>
                                    <td>{ user_group }</td>
                                    <td>{ username }</td>
                                    <td>{ exam_name }</td>
                                    <td>{ started_at }</td>
                                    <td>{ isAbandoned ?
                                        <span className={'text-danger'}>Abandoned</span>
                                        :
                                        finished_at ?? <span className={'text-success'}>In progress</span>
                                    }
                                    </td>
                                    <td>
                                        <span className={ isActive ? 'text-success' : 'text-danger' }>
                                            { isActive ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td>{ mode }</td>
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