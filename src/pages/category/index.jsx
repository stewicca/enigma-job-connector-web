import useSort from '@/hooks/use-sort.js';
import useSearch from '@/hooks/use-search.js';
import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import CategoryList from '@/pages/category/components/category-list.jsx';

// API URL
const CATEGORY_USER_API_URL = '/api/user/category';

const Category = () => {
    const { toast } = useToast()
    const { searchParam, handleChangeSearchParams } = useSearch('name');
    const { sortBy, sortDirection, handleSort } = useSort();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.GET, CATEGORY_USER_API_URL, {}, [['name', searchParam], ['sortBy', sortBy]]);
    const { mutateAsync: deleteCategory } = useFetch(HTTP_METHODS.DELETE, CATEGORY_USER_API_URL);

    const handleDelete = async (id) => {
        try {
            const { message } = await deleteCategory(id);
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <CategoryList
            data={data.data}
            onDelete={handleDelete}
            onChangeSearchParams={handleChangeSearchParams}
            sortDirection={sortDirection}
            onSort={handleSort}
        />
    );
}

export default Category;
