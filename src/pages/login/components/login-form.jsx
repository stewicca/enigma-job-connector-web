import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast.js'
import { useNavigate } from 'react-router'
import useLogin from '../hooks/use-login.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters.'),
    password: z.string().min(8, 'Password must be at least 8 characters.')
});

const LoginForm = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { mutateAsync } = useLogin();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (values) => {
        try {
            const { data, message } = await mutateAsync(values);
            sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
            toast({ description: message });
            navigate('/', { replace: true });
        } catch (error) {
            toast({ variant: 'destructive', description: error.message });
        }
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter your username' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Enter your password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full'>Login</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        Don&#39;t have an account? <a href='/signup' className='text-blue-600 hover:underline'>Sign up</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginForm;
