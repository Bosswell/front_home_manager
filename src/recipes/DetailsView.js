import React from "react";

function DetailsView({ name, content }) {
    const html = () => ({__html: content});

    return (
        <>
            <h3>{ name }</h3>
            <article dangerouslySetInnerHTML={html()}/>
        </>
    )
}

export default DetailsView;