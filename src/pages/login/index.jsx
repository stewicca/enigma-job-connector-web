import { useNavigate } from 'react-router';
import { useFetch } from '@/hooks/use-fetch.js';
import { useToast } from '@/hooks/use-toast.js';
import { getErrorMessage } from '@/lib/get-error-message.js';
import LoginForm from '@/pages/login/components/login-form.jsx';

// API URL
const LOGIN_API_URL = '/api/auth/login';

const Login = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { mutateAsync: login } = useFetch(null, LOGIN_API_URL);

    const onSubmit = async (body) => {
        try {
            const { data, message } = await login(body);
            sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
            toast({ description: message });
            navigate('/', { replace: true });
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    return <LoginForm onSubmit={onSubmit} />;
}

export default Login;
