import { AxiosError } from 'axios';

export function getErrorMessage(error) {
    if (error instanceof AxiosError) {
        return error.response?.data?.message || "An API error occurred";
    } else if (error instanceof Error) {
        return error.message;
    }
    return "An unknown error occurred";
}
