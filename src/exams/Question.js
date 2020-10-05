import React from "react";

function Question({ query, children, index }) {
    return (
        <div className={'question'}>
            <h4>Question: { index }</h4>
            <div className={'question--query'}>{ query }</div>
            { children }
        </div>
    );
}

export default Question;