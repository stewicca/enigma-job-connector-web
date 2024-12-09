import * as z from 'zod';

export const categoryFormSchema = z.object({
    name: z.string({ required_error: 'Name cannot be empty' }),
});
