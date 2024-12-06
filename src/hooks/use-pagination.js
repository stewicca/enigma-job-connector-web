import { useSearchParams } from 'react-router';

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page') || '1';
    const size = searchParams.get('size') || '5';

    const handleChangePage = (page) => {
        searchParams.set('page', page);
        setSearchParams(searchParams);
    }

    const handleChangeSize = (size) => {
        searchParams.set('size', size);
        setSearchParams(searchParams);
    }

    return { page, size, handleChangePage, handleChangeSize };
}
