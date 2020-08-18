import React from "react";

export const SUCCESS_ALERT = 'SUCCESS_ALERT';
export const FAILURE_ALERT = 'FAILURE_ALERT';

function Alert({ type, message }) {
    function renderAlertTypeClass() {
        switch (type) {
            case SUCCESS_ALERT:
                return 'alert-success';
            case FAILURE_ALERT:
                return 'alert-failure';
            default:
                return 'alert-info';
        }
    }

    return (
        <div className={'alert ' + renderAlertTypeClass()}>
            {message}
        </div>
    )
}

export default Alert;
