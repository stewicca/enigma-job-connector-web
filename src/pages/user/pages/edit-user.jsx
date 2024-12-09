import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useNavigate, useParams } from 'react-router';
import { getErrorMessage } from '@/lib/get-error-message.js';
import EditUserForm from '@/pages/user/components/edit-user-form.jsx';

// API
const USER_API_URL = '/api/user';
const CATEGORY_USER_API_URL = '/api/user/category';

const EditUser = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: users, isLoading: isUserFetching } = useFetch(HTTP_METHODS.FIND, USER_API_URL, {}, [id]);
    const { data: categories, isLoading: isCategoryFetching } = useFetch(HTTP_METHODS.GET, CATEGORY_USER_API_URL);
    const { mutateAsync: editUser } = useFetch(HTTP_METHODS.PUT, USER_API_URL, {}, [id]);

    const handleSubmit = async (body) => {
        try {
            const { message } = await editUser(body);
            toast({ description: message });
            navigate('/user');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isUserFetching || isCategoryFetching) {
        return <div>Loading...</div>;
    }

    const initialValues = {
        id: users.data.id,
        name: users.data.name,
        username: users.data.username,
        email: users.data.email,
        role: users.data.role,
        categoryId: users.data.category.id,
    }

    return <EditUserForm categories={categories.data} initialValues={initialValues} onSubmit={handleSubmit} />;
}

export default EditUser;
