import React, { useState } from "react";

function Option({ id, content, handleOnClick, correctOptions, checkedOptions }) {
    const isCorrect = correctOptions.length ? correctOptions.find(option => option === id) : false;
    const isChecked = checkedOptions.length ? checkedOptions.find(option => option === id) : false;
    const [clicked, setClicked] = useState(false);

    let className = isChecked && !isCorrect ? ' --invalid' : '';

    if (isCorrect) {
        if (isChecked) {
            className += ' --valid';
        } else {
            className += ' --neutral';
        }
    }

    if (clicked && !isChecked) {
        className += ' --checked';
    }

    return (
        <div className={'question--option' + className} onClick={() => {setClicked(prevState => !prevState); handleOnClick()}}>
            { content }
        </div>
    );
}

export default Option;