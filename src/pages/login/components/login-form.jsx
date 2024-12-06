import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/pages/login/schema/index.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const LoginForm = ({ onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const handleSubmit = async (values) => {
        await onSubmit(values);
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your username and password to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your username' {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Enter your password' {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full'>Login</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        Don&#39;t have an account?
                        <a href='/signup' className='text-blue-600 hover:underline'>Sign up</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default LoginForm;
