import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/pages/login/schema/index.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Image
import illustration from '@/assets/illustration.png';

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
        <div className='flex items-center justify-center min-h-screen bg-spaceCadet'>
            <div className='w-[90%] max-w-md lg:max-w-4xl mx-auto p-4 lg:p-8 bg-brightGray rounded-3xl'>
                <div className='relative flex justify-between items-center w-full rounded-3xl overflow-hidden'>
                    <div className='hidden lg:block w-[35%] h-[500px] bg-beer rounded-3xl'>
                        <img src={illustration} className='absolute h-[500px] bottom-0 -left-1/4' />
                    </div>
                    <Card className='w-full max-w-md text-raisinBlack bg-brightGray border-0 rounded-3xl shadow-none'>
                        <CardHeader>
                            <CardTitle className='text-beer text-3xl text-center font-extrabold'>Login</CardTitle>
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
                                                    <Input className='focus-visible:ring-beer' placeholder='Enter your username' {...field} />
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
                                                    <Input className='focus-visible:ring-beer' type='password' placeholder='Enter your password' {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' variant='secondary' className='w-full'>Log In</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className='flex justify-center'>
                            <Link to='#' className='font-light underline underline-offset-2'>Forgot password?</Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default LoginForm;
