import { BrowserRouter } from 'react-router'
import AppRoutes from '@/routes.jsx'

const App = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
