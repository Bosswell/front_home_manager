import React from "react";

function Option({ content, handleOnClick }) {
    return (
        <div className={'question--option'} onClick={handleOnClick}>
            { content }
        </div>
    );
}

export default Option;