import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthClient } from '@/hooks/use-auth-client.js';

const useDeleteUser = () => {
    const authClient = useAuthClient();
    return useMutation({
        mutationFn: async (id) => {
            try {
                const { data } = await authClient.delete(`/api/user/${id}`);
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response.data;
                }
                throw new Error('An error occurred.');
            }
        }
    })
}

export default useDeleteUser;
