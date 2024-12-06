import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAuthClient } from '@/hooks/use-auth-client.js';

const useGetUsers = (page) => {
    const authClient = useAuthClient();
    return useQuery({
        queryKey: ['user', page],
        queryFn: async () => {
            try {
                const { data } = await authClient.get('/api/user', { params: { page }});
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response.data;
                }
                throw new Error('An error occurred.');
            }
        }
    });
}

export default useGetUsers;
