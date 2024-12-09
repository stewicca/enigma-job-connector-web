import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import AddCategoryForm from '@/pages/category/components/add-category-form.jsx';

// API URL
const CATEGORY_USER_API_URL = '/api/user/category';

const AddCategory = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { mutateAsync: addCategory } = useFetch(HTTP_METHODS.POST, CATEGORY_USER_API_URL);
    
    const handleSubmit = async (body) => {
        try {
            const { message } = await addCategory(body);
            toast({ description: message });
            navigate('/category');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };
    
    return <AddCategoryForm onSubmit={handleSubmit} />
}

export default AddCategory;
