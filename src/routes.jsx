import { Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router'
import DashboardLayout from '@/components/layouts/dashboard-layout.jsx'
import { Dashboard, Login, NotFound } from '@/pages'

const AppRouter = () => {
    return useRoutes([
        {
            path: '',
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                {
                    index: true,
                    element: <Dashboard />
                }
            ]
        },
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
