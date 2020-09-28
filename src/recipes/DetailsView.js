import React from "react";

function DetailsView({name, content}) {
    return (
        <>
            <h3>{ name }</h3>
            <article>{ content }</article>
        </>
    )
}

export default DetailsView;