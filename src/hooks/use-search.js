import { useSearchParams } from 'react-router';

const useSearch = (param) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChangeSearchParams = (updatedSearchParams) => {
        searchParams.set(param, updatedSearchParams);
        setSearchParams(searchParams);
    }

    return {
        searchParam: searchParams.get(param),
        handleChangeSearchParams
    }
}

export default useSearch;
