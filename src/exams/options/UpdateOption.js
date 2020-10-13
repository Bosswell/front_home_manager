import React, { useContext } from "react";
import { PageContext } from "../../PageContext";
import { normalizeResponseErrors } from "../../helpers/normalizers";
import "../../scss/entity-details.scss";
import OptionForm from "./OptionForm";
import { updateOption } from "../../services/options.service";


function UpdateOption({ inputData, setInputData, setOption, optionId }) {
    const {setError, setAlert, setLoading, clearNotifications} = useContext(PageContext);

    function handleClickForm() {
        setLoading(true);
        updateOption({ ...inputData, optionId: optionId}).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            clearNotifications();
            setOption(prevState => {
                return Object.assign({}, prevState, inputData);
            });

            setAlert(response.message)
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <OptionForm
            handleClickForm={handleClickForm}
            inputData={inputData}
            setInputData={setInputData}
            action={'Update'}
            showHeader={false}
        />
    );
}

export default UpdateOption;