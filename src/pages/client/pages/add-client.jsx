import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast.js';
import { useFetch } from '@/hooks/use-fetch.js';
import { HTTP_METHODS } from '@/lib/constant.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import AddClientForm from "@/pages/client/components/add-client-form.jsx";

// API URL
const CLIENT_API_URL = '/api/client';

const AddClient = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { mutateAsync: addClient } = useFetch(HTTP_METHODS.POST, CLIENT_API_URL);

    const handleSubmit = async (body) => {
        try {
            const { message } = await addClient(body);
            toast({ description: message });
            navigate('/client');
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    };

    return <AddClientForm onSubmit={handleSubmit} />
}

export default AddClient;
