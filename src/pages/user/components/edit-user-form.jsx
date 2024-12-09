import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { editUserFormSchema } from '@/pages/user/schema/index.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';

const EditUserForm = ({ categories, onSubmit, initialValues }) => {
    const form = useForm({
        resolver: zodResolver(editUserFormSchema),
        defaultValues: initialValues
    });

    const handleSubmit = async (values) => {
        await onSubmit(values);
    }

    return (
        <div className='flex flex-col gap-6 py-5'>
            <h1 className='text-beer text-2xl font-bold'>Edit User</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input className='focus-visible:ring-beer' placeholder='John Doe' {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='username'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input className='focus-visible:ring-beer' placeholder='johndoe' {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input className='focus-visible:ring-beer' type='email' placeholder='john@example.com' {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='role'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='focus:ring-beer'>
                                            <SelectValue placeholder='Select a role'/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Admin'>Admin</SelectItem>
                                        <SelectItem value='User'>User</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='focus:ring-beer'>
                                            <SelectValue placeholder='Select a category'/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        { categories && categories.map((category) => (
                                            <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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

EditUserForm.propTypes = {
    categories: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.oneOf(['Admin', 'User']),
        categoryId: PropTypes.string,
    })
};

export default EditUserForm;
