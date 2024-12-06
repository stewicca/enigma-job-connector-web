import * as z from 'zod';

export const loginFormSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters.'),
    password: z.string().min(8, 'Password must be at least 8 characters.')
});
