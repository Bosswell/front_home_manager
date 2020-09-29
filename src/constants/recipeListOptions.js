export const sortingOptions = [
    {
        label: "Creation date - Ascending",
        value: "r.created_at,asc"
    },
    {
        label: "Creation date - Descending",
        value: "r.created_at,desc"
    },
    {
        label: "Position number - Ascending",
        value: "r.id,asc"
    },
    {
        label: "Position number - Descending",
        value: "r.id,desc"
    },
    {
        label: "Transaction type - Ascending",
        value: "r.name,asc"
    },
    {
        label: "Transaction type - Descending",
        value: "r.name,desc"
    },
]

export const defaultSorting = {
    label: "Creation date - Descending",
    value: "r.created_at,desc"
};