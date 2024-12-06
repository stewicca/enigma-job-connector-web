import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthClient } from '@/hooks/use-auth-client.js';

const useEditUser = (id) => {
    const authClient = useAuthClient();
    return useMutation({
        mutationFn: async (request) => {
            try {
                const { data } = await authClient.put(`/api/user/${id}`, request);
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

export default useEditUser;
