import React from "react";
import {Alert, Col, ListGroup, Row} from "react-bootstrap";
import Select from "react-select";
import { sortingOptions } from "../constants/examsListOptions";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { EXAM_ROUTE } from "../constants/routes";
import { APP_URL } from "../config";

function ExamsListView(
    {
        params,
        handleSortingSelectChange,
        sortingWay,
        examsListInfo,
        handlePageChange,
        handleExamClick
    }
) {
    return (
        <Row>
            <Col lg={12}>
                <Alert variant={'info'}>
                    <Alert.Heading>Tip of the day..</Alert.Heading>
                    <span>To start the exam, go to <Link to={EXAM_ROUTE}>{ APP_URL }/exam</Link> and that's it!</span>
                </Alert>
            </Col>
            <Col lg={12}>
                <div className={'list-filters'}>
                    <div className={'sorting-select'}>
                        <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                    </div>
                </div>

                <ListGroup className={'entry-list'} variant="flush">
                    {!examsListInfo.results.length && <div>There is no available exams</div>}

                    {examsListInfo.results.map((item) => {
                        return (
                            <ListGroup.Item key={item.id}>
                                <div
                                    className={'text-info pointer btn-link'}
                                    onClick={() => {handleExamClick(parseInt(item.id))}}
                                >
                                    { item.name }
                                </div>
                                <div>Created at: { item.created_at }</div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

                <ReactPaginate
                    onPageChange={handlePageChange}
                    forcePage={params.nbPage ? params.nbPage - 1 : 0}
                    disableInitialCallback={true}
                    pageCount={examsListInfo.nbPages}
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

export default ExamsListView;