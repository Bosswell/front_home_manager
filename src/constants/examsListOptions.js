export const sortingOptions = [
    {
        label: "Creation date - Ascending",
        value: "e.created_at,asc"
    },
    {
        label: "Creation date - Descending",
        value: "e.created_at,desc"
    },
    {
        label: "Position number - Ascending",
        value: "e.id,asc"
    },
    {
        label: "Position number - Descending",
        value: "e.id,desc"
    },
    {
        label: "Transaction type - Ascending",
        value: "e.name,asc"
    },
    {
        label: "Transaction type - Descending",
        value: "e.name,desc"
    },
]

export const defaultSorting = {
    label: "Creation date - Descending",
    value: "e.created_at,desc"
};