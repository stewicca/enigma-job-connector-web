import { Navigate, useRoutes } from 'react-router'
import { Login, NotFound } from '@/pages'

const AppRouter = () => {
    return useRoutes([
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: '404',
            element: <NotFound />
        },
        {
            path: '*',
            element: <Navigate to='/404' replace />
        }
    ]);
}

export default AppRouter;
