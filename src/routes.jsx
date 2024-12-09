import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router';

// Layouts
import DashboardLayout from '@/components/layouts/dashboard-layout.jsx';

// Pages
import { AddCategory, AddUser, Category, EditCategory, EditUser, Login, NotFound, User } from '@/pages';

const AppRouter = () => {
    return useRoutes([
        {
            path: '',
            element: (
                <DashboardLayout>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                {
                    index: true,
                    element: <Navigate to='/user' replace />,
                },
                {
                    path: 'category',
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                        </Suspense>
                    ),
                    children: [
                        {
                            index: true,
                            element: <Category />
                        },
                        {
                            path: 'add',
                            element: <AddCategory />
                        },
                        {
                            path: 'edit/:id',
                            element: <EditCategory />
                        }
                    ]
                },
                {
                    path: 'user',
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                        </Suspense>
                    ),
                    children: [
                        {
                            index: true,
                            element: <User />
                        },
                        {
                            path: 'add',
                            element: <AddUser />
                        },
                        {
                            path: 'edit/:id',
                            element: <EditUser />
                        }
                    ]
                },
            ],
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: '404',
            element: <NotFound />
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />
        },
    ]);
};

export default AppRouter;
