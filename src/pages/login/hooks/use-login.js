import axios, { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'

const useLogin = () => {
    return useMutation({
        mutationFn: async (request) => {
            try {
                const { data } = await axios.post('/api/auth/login', request);
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw error.response.data;
                }
                throw new Error("An error occurred.");
            }
        }
    });
}

export default useLogin;
