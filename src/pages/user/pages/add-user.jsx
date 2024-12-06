import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast.js';
import AddUserForm from '../components/add-user-form.jsx';
import useAddUser from '@/pages/user/hooks/use-add-user.js';

const AddUser = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { mutateAsync } = useAddUser();

    const handleSubmit = async (values) => {
        try {
            const { message } = await mutateAsync(values);
            toast({ description: message });
            navigate('/user');
        } catch (error) {
            toast({ variant: 'destructive', description: error.message });
        }
    };

    return <AddUserForm onSubmit={handleSubmit} />
};

export default AddUser;
