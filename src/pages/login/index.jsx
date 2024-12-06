import LoginForm from './components/login-form.jsx'
import {useToast} from "@/hooks/use-toast.js";
import {useNavigate} from "react-router";
import useLogin from "@/pages/login/hooks/use-login.js";

const Login = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { mutateAsync } = useLogin();

    const onSubmit = async (values) => {
        try {
            const { data, message } = await mutateAsync(values);
            sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
            toast({ description: message });
            navigate('/', { replace: true });
        } catch (error) {
            toast({ variant: 'destructive', description: error.message });
        }
    }

    return <LoginForm onSubmit={onSubmit} />;
}

export default Login;
