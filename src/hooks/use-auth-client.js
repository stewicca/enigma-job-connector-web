import { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast.js';
import { useMutation } from '@tanstack/react-query';

export const useAuthClient = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const authClient = axios.create({ withCredentials: true });
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            try {
                const { data } = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true });
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response.data;
                }
                throw new Error('An error occurred.');
            }
        }
    });

    useEffect(() => {
        const requestInterceptor = authClient.interceptors.request.use(
            (config) => {
                const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        )

        const responseInterceptor = authClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401) {
                    try {
                        const { data } = await mutateAsync();
                        sessionStorage.setItem('accessToken', data.accessToken);
                        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                        return authClient.request(originalRequest);
                    } catch (refreshError) {
                        sessionStorage.removeItem('accessToken');
                        toast({ variant: 'destructive', description: 'Token expired, please login' });
                        navigate('/login', { replace: true });
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        )

        return () => {
            authClient.interceptors.request.eject(requestInterceptor);
            authClient.interceptors.response.eject(responseInterceptor);
        };
    }, [authClient, mutateAsync, navigate, toast]);

    return authClient;
}
