import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import AddUserForm from '@/pages/user/components/add-user-form.jsx';

// API URL
const USER_API_URL = '/api/user';
const CATEGORY_USER_API_URL = '/api/user/category';

const AddUser = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { data, isLoading } = useFetch(HTTP_METHODS.GET, CATEGORY_USER_API_URL);
    const { mutateAsync: addUser } = useFetch(HTTP_METHODS.POST, USER_API_URL);

    const handleSubmit = async (body) => {
        try {
            const { message } = await addUser(body);
            toast({ description: message });
            navigate('/user');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <AddUserForm categories={data.data} onSubmit={handleSubmit} />
};

export default AddUser;
