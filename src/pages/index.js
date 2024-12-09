import { lazy } from 'react';
import NotFound from './404/index.jsx';

const Login = lazy(() => import('./login'));
const Category = lazy(() => import('./category'));
const AddCategory = lazy(() => import('./category/pages/add-category'));
const EditCategory = lazy(() => import('./category/pages/edit-category'));
const User = lazy(() => import('./user'));
const AddUser = lazy(() => import('./user/pages/add-user.jsx'));
const EditUser = lazy(() => import('./user/pages/edit-user.jsx'));

export {
    NotFound,
    Login,
    Category,
    AddCategory,
    EditCategory,
    User,
    AddUser,
    EditUser
}
