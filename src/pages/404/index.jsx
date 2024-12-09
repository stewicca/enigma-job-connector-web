import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button.jsx';

const NotFound = () => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900'>
            <div className='text-center'>
                <h1 className='text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4'>404</h1>
                <p className='text-xl text-gray-600 dark:text-gray-400 mb-8'>Oops! Page not found</p>
                <div className='mb-8'>
                    <svg className='w-64 h-64 mx-auto text-gray-400 dark:text-gray-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                </div>
                <Button>
                    <NavLink to='/'>Go back home</NavLink>
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
