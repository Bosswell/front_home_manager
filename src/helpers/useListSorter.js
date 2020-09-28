import { useState, useEffect } from 'react';

function useListSorter(params, sortingOptions, defaultSorting) {
    const [sortingWay, setSortingWay] = useState('');

    useEffect(() => {
        setSortingWay(() => {
            if (!params.sortBy) {
                return defaultSorting;
            }
            const {name, direction} = params.sortBy;

            return sortingOptions.find((obj) => {
                const [tmpName, tmpDirection] = obj.value.split(',');

                return name === tmpName && direction === tmpDirection;
            });
        })
    }, [defaultSorting, params.sortBy, sortingOptions])

    return [sortingWay];
}

export default useListSorter;