import { lazy } from 'react'
import NotFound from './404/index.jsx'

const Login = lazy(() => import('./login'));
const Dashboard = lazy(() => import('./dashboard'));

export { NotFound, Login, Dashboard }
