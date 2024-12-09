import useSort from '@/hooks/use-sort.js';
import useSearch from '@/hooks/use-search.js';
import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { usePagination } from '@/hooks/use-pagination.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import UserList from '@/pages/user/components/user-list.jsx';

// API URL
const USER_API_URL = '/api/user';
const IMPORT_USER_API_URL = '/api/user/data/import';
const EXPORT_USER_API_URL = '/api/user/data/export';

const User = () => {
    const { toast } = useToast();
    const { page, handleChangePage } = usePagination();
    const { searchParam, handleChangeSearchParams } = useSearch('name');
    const { sortBy, sortDirection, handleSort } = useSort();
    const { data, isLoading, refetch } = useFetch(HTTP_METHODS.GET, USER_API_URL, {}, [['name', searchParam], ['page', page], ['sortBy', sortBy]]);
    const { mutateAsync: deleteUser } = useFetch(HTTP_METHODS.DELETE, USER_API_URL);
    const { mutateAsync: exportUser } = useFetch(HTTP_METHODS.POST, EXPORT_USER_API_URL, { responseType: 'blob' });
    const { mutateAsync: importUser } = useFetch(HTTP_METHODS.POST, IMPORT_USER_API_URL, { headers: { 'Content-Type': 'multipart/form-data' } });

    const handleDelete = async (id) => {
        try {
            const {message} = await deleteUser(id);
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    const handleExport = async () => {
        try {
            const blob = await exportUser();

            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'export_user.xlsx');

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };


    const handleImport = async (body) => {
        try {
            const { message } = await importUser(body);
            toast({ description: message });
            await refetch();
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <UserList
            data={data}
            onDelete={handleDelete}
            onChangePage={handleChangePage}
            onExport={handleExport}
            onImport={handleImport}
            onChangeSearchParams={handleChangeSearchParams}
            sortDirection={sortDirection}
            onSort={handleSort}
        />
    );
}

export default User;
