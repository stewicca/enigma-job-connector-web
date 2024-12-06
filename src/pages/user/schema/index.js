import * as z from 'zod';

export const addUserFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 2 characters.'),
    username: z.string().min(3, 'Username must be at least 3 characters.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    role: z.enum(['Admin', 'User'], { required_error: 'Please select a role.' })
});

export const editUserFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 2 characters.'),
    username: z.string().min(3, 'Username must be at least 3 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    role: z.enum(['Admin', 'User'], { required_error: 'Please select a role.' })
});
