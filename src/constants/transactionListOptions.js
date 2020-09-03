export const sortingOptions = [
    {
        label: "Amount - Ascending",
        value: "t.amount,asc"
    },
    {
        label: "Amount - Descending",
        value: "t.amount,desc"
    },
    {
        label: "Creation date - Ascending",
        value: "t.createdAt"
    },
    {
        label: "Creation date - Descending",
        value: "t.createdAt,desc"
    },
    {
        label: "Position number - Ascending",
        value: "t.id,asc"
    },
    {
        label: "Position number - Descending",
        value: "t.id,desc"
    },
    {
        label: "Transaction type - Ascending",
        value: "tt.name,asc"
    },
    {
        label: "Transaction type - Descending",
        value: "tt.name,desc"
    },
]

export const defaultSorting = {
    label: "Position number - Descending",
    value: "t.id, desc"
};

export const filterDateFromOptions = [
    {
        label: 'Last day',
        value: 1
    },
    {
        label: 'Last week',
        value: 7
    },
    {
        label: 'Last month',
        value: 30
    },
]