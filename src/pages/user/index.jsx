import { useToast } from '@/hooks/use-toast.js';
import { usePagination } from '@/hooks/use-pagination.js';
import UserList from '@/pages/user/components/user-list.jsx';
import useGetUsers from '@/pages/user/hooks/use-get-users.js';
import useDeleteUser from '@/pages/user/hooks/use-delete-user.js';

const User = () => {
    const { toast } = useToast();
    const { page, handleChangePage } = usePagination();
    const { data, isLoading, refetch } = useGetUsers(page);
    const { mutateAsync } = useDeleteUser();

    const handleDelete = async (id) => {
        try {
            const {message} = await mutateAsync(id);
            toast({description: message});
            await refetch();
        } catch (error) {
            toast({variant: 'destructive', description: error.message});
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <UserList data={data} handleDelete={handleDelete} handleChangePage={handleChangePage} />;
}

export default User;
