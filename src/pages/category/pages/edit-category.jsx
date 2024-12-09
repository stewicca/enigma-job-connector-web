import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useNavigate, useParams } from 'react-router';
import { getErrorMessage } from '@/lib/get-error-message.js';
import EditCategoryForm from '@/pages/category/components/edit-category-form.jsx';

// API URL
const CATEGORY_USER_API_URL = '/api/user/category';

const EditCategory = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading } = useFetch(HTTP_METHODS.FIND, CATEGORY_USER_API_URL, {}, [id]);
    const { mutateAsync: editCategory } = useFetch(HTTP_METHODS.PUT, CATEGORY_USER_API_URL, {}, [id]);
    
    const handleSubmit = async (body) => {
        try {
            const { message } = await editCategory(body);
            toast({ description: message });
            navigate('/category');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return <EditCategoryForm initialValues={data.data} onSubmit={handleSubmit} />;
}

export default EditCategory;
