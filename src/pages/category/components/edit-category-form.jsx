import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoryFormSchema } from '@/pages/category/schema/index.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';

const EditCategoryForm = ({ initialValues, onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: initialValues,
    });

    const handleSubmit = async (values) => {
        await onSubmit(values);
    }

    return (
        <div className='flex flex-col gap-6 py-5'>
            <h1 className='text-beer text-2xl font-bold'>Edit Category</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input className='focus-visible:ring-beer' placeholder='Batch #1' {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' variant='secondary'>Submit</Button>
                </form>
            </Form>
        </div>
    );
}

EditCategoryForm.propTypes = {
    initialValues: PropTypes.shape({
        name: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired
}

export default EditCategoryForm;
