import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { useNavigate, useParams } from 'react-router';
import { getErrorMessage } from '@/lib/get-error-message.js';
import EditClientForm from "@/pages/client/components/edit-client-form.jsx";

// API URL
const CLIENT_API_URL = '/api/client';

const EditClient = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading } = useFetch(HTTP_METHODS.FIND, CLIENT_API_URL, {}, [id]);
    const { mutateAsync: editClient } = useFetch(HTTP_METHODS.PUT, CLIENT_API_URL, {}, [id]);

    const handleSubmit = async (body) => {
        try {
            const { message } = await editClient(body);
            toast({ description: message });
            navigate('/client');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <EditClientForm initialValues={data.data} onSubmit={handleSubmit} />;
}

export default EditClient;
