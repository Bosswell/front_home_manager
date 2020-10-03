import React from "react";

function Option({ id, content, handleOnClick, correctOptions, checkedOptions }) {
    const isCorrect = correctOptions.length ? correctOptions.find(option => option === id) : false;
    const isChecked = checkedOptions.length ? checkedOptions.find(option => option === id) : false;

    let className = isChecked && !isCorrect ? ' --invalid' : '';
    className += isCorrect ? ' --valid' : '';

    return (
        <div className={'question--option' + className} onClick={handleOnClick}>
            { content }
        </div>
    );
}

export default Option;