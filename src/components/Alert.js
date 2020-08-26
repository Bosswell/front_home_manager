import React from "react";
import { Alert as ReactAlert } from "react-bootstrap";

/**
 * Param messages can also be a string
 */
function Alert({ type, messages, headMsg }) {
    function renderAlertBody() {
        if (Array.isArray(messages)) {
            return (
                <ol>
                    {messages.map(message => {
                        return (
                            <li> { message } </li>
                        );
                    })}
                </ol>
            );
        }

        return messages;
    }

    return (
        <ReactAlert variant={type}>
            {headMsg && <ReactAlert.Heading>{ headMsg }</ReactAlert.Heading>}
            { renderAlertBody() }
        </ReactAlert>
    )
}

export default Alert;
