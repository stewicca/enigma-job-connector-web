import { useToast } from '@/hooks/use-toast.js';
import useGetUser from '../hooks/use-get-user.js';
import useEditUser from '../hooks/use-edit-user.js';
import { useNavigate, useParams } from 'react-router';
import EditUserForm from '@/pages/user/components/edit-user-form.jsx';

const EditUser = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: data, isLoading } = useGetUser(id);
    const { mutateAsync } = useEditUser(id);

    const handleSubmit = async (values) => {
        try {
            const { message } = await mutateAsync(values);
            toast({ description: message });
            navigate('/user');
        } catch (error) {
            toast({ variant: 'destructive', description: error.message });
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <EditUserForm initialValues={data.data} onSubmit={handleSubmit} />;
}

export default EditUser;
