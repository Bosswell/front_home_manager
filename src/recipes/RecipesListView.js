import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import InputGroup from "../components/InputGroup";
import Select from "react-select";
import { sortingOptions } from "../constants/recipeListOptions";
import ReactPaginate from "react-paginate";

function RecipesListView(
    {
        params,
        handleSearchRecipe,
        handleSortingSelectChange,
        sortingWay,
        recipeListInfo,
        handlePageChange,
        setRecipeId
    }
) {
    return (
        <Row>
            <Col lg={12}>
                <div className={'list-filters'}>
                    <div className={'filters form'}>
                        <InputGroup onChange={handleSearchRecipe} name={'search'} type={'search'} placeholder={'Search ...'}/>
                    </div>
                    <div className={'sorting-select'}>
                        <Select onChange={handleSortingSelectChange} value={sortingWay} options={sortingOptions} placeholder={'Sort by'}/>
                    </div>
                </div>

                <ListGroup className={'transaction-list'} variant="flush">
                    {recipeListInfo.results.map((item) => {
                        return (
                            <ListGroup.Item key={item.id}>
                                <div
                                    className={'text-info pointer btn-link'}
                                    onClick={() => {setRecipeId(parseInt(item.id))}}
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
                    pageCount={recipeListInfo.nbPages}
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

export default RecipesListView;