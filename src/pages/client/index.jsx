import useSort from '@/hooks/use-sort.js';
import useSearch from '@/hooks/use-search.js';
import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import ClientList from '@/pages/client/components/client-list.jsx';

// API URL
const CLIENT_API_URL = '/api/client';

const Client = () => {
    const { toast } = useToast();
    const { searchParam, handleChangeSearchParams } = useSearch('name');
    const { sortBy, sortDirection, handleSort } = useSort();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.GET, CLIENT_API_URL, {}, [['name', searchParam], ['sortBy', sortBy]]);
    const { mutateAsync: deleteClient } = useFetch(HTTP_METHODS.DELETE, CLIENT_API_URL);

    const handleDelete = async (id) => {
        try {
            const { message } = await deleteClient(id);
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
        <ClientList
            data={data.data}
            onDelete={handleDelete}
            onChangeSearchParams={handleChangeSearchParams}
            sortDirection={sortDirection}
            onSort={handleSort}
        />
    );
}

export default Client;
