import React, {useContext, useState} from "react";
import InputGroup from "../components/InputGroup";
import Switch from "react-switch";
import Select from "react-select";
import { examModes } from "../constants/examModes";
import { Button, Col, Row } from "react-bootstrap";
import { inputNormalizer, INT_TYPE } from "../helpers/inputNormalizer";
import { addExam } from "../services/exam.service";
import { PageContext } from "../PageContext";
import { normalizeResponseErrors } from "../helpers/normalizers";


function ExamForm({ action, inputData, setInputData }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);

    function handleInputChange({ target }) {
        setInputData(prevState => {
            return Object.assign({}, prevState, inputNormalizer(target));
        })
    }

    function handleSelectChange({ value }) {
        setInputData(prevState => ({
            ...prevState,
            mode: value
        }));
    }

    function handleClickForm() {
        const errors = validateInputs();

        if (errors) {
            setError(errors);
            return;
        }

        setLoading(true);
        addExam({ ...inputData, mode: inputData.mode.value }).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();

            setAlert(response.message)
        }).finally(() => {
            setLoading(false);
        })
    }

    function validateInputs() {
        let err = [];

        if (!inputData.name.trim()) {
            err.push('Exam name cannot be empty')
        }

        if (!inputData.code.trim()) {
            err.push('Code cannot be empty')
        }

        if (inputData.timeout <= 0) {
            err.push('Timeout must be greater then 0')
        }

        return err;
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