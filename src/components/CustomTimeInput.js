import React from "react";

function CustomTimeInput({ date, value, onChange }) {
    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ border: "solid 1px #999" }}
        />
    )
}

export default CustomTimeInput