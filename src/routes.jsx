import { Navigate, useRoutes } from 'react-router'
import { NotFound } from '@/pages'

const AppRouter = () => {
    return useRoutes([
        {
            path: '/404',
            element: <NotFound />
        },
        {
            path: '*',
            element: <Navigate to='/404' replace />
        }
    ]);
}

export default AppRouter;
