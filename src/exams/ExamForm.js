import React from "react";
import InputGroup from "../components/InputGroup";
import Switch from "react-switch";
import Select from "react-select";
import { examModes } from "../constants/examModes";
import { Button, Col, Row } from "react-bootstrap";
import { inputNormalizer, INT_TYPE } from "../helpers/inputNormalizer";


function ExamForm({ action, inputData, setInputData, handleClickForm }) {
    function handleInputChange({ target }) {
        setInputData(prevState => {
            return Object.assign({}, prevState, inputNormalizer(target));
        })
    }

    function handleSelectChange(selected) {
        setInputData(prevState => ({
            ...prevState,
            mode: selected
        }));
    }

    return (
        <Row>
            <Col lg={6} sm={12}>
                <form className={'form exam-form'}>
                    <InputGroup
                        onChange={handleInputChange}
                        name={'name'}
                        label={'Exam name'}
                        value={inputData.name}
                    />
                    <InputGroup
                        onChange={handleInputChange}
                        handleInputChange
                        name={'code'}
                        label={'Some code ex. OKON'}
                        value={inputData.code}
                    />

                    <div>Pick validation mode</div>
                    <Select defaultValue={inputData.mode} onChange={handleSelectChange} options={examModes} placeholder={'Validation mode'}/>
                    <ol>
                        <li>Standard: users needs to guess all options in question to receive a point</li>
                        <li>Subtraction: every correct option add point, every wrong option subtracts a point</li>
                    </ol>

                    <div>Can exam be visible to users after validation?</div>
                    <Switch
                        onChange={() => setInputData(prevState => ({ ...prevState, hasVisibleResult: !prevState.hasVisibleResult }))}
                        checked={inputData.hasVisibleResult}
                        checkedIcon={false}
                        uncheckedIcon={false}
                    />

                    <div>Is available?</div>
                    <Switch
                        onChange={() => setInputData(prevState => ({ ...prevState, isAvailable: !prevState.isAvailable }))}
                        checked={inputData.isAvailable}
                        checkedIcon={false}
                        uncheckedIcon={false}
                    />

                    <InputGroup
                        data-scalar={INT_TYPE}
                        onChange={handleInputChange}
                        name={'timeout'}
                        type={'number'}
                        label={'Timeout in minutes'}
                        value={inputData.timeout}
                    />

                    <Button variant={'success'} onClick={handleClickForm}>{ action } exam</Button>
                </form>
            </Col>
        </Row>
    );
}

export default ExamForm;