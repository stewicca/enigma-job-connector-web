import { useState } from 'react';
import { useSearchParams } from 'react-router';

function useSort() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortDirection, setSortDirection] = useState({ field: '', direction: '' });

    const handleSort = (field) => {
        if (!field) return;

        let newSortDirection = '';

        if (sortDirection.field !== field || sortDirection.direction === '') {
            newSortDirection = 'asc';
        } else if (sortDirection.direction === 'asc') {
            newSortDirection = 'desc';
        } else if (sortDirection.direction === 'desc') {
            newSortDirection = '';
        }

        setSortDirection({field, direction: newSortDirection});
        const sortParam = newSortDirection === 'asc' ? field : `-${field}`;

        if (newSortDirection === '') {
            deleteSortParam()
        } else {
            handleChangeSort(sortParam);
        }
    }


    const deleteSortParam = () => {
        searchParams.delete('sortBy');
        setSearchParams(searchParams);
    }

    const handleChangeSort = (field) => {
        searchParams.set('sortBy', field);
        setSearchParams(searchParams);
    }

    return {
        sortDirection,
        sortBy: searchParams.get('sortBy'),
        handleSort
    }
}

export default useSort;
