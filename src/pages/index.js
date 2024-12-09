import { lazy } from 'react';
import NotFound from './404/index.jsx';

const Login = lazy(() => import('./login'));
const User = lazy(() => import('./user'));
const AddUser = lazy(() => import('./user/pages/add-user.jsx'));
const EditUser = lazy(() => import('./user/pages/edit-user.jsx'));

export {
    NotFound,
    Login,
    User,
    AddUser,
    EditUser
}
