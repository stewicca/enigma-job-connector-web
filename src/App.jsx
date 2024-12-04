import { Suspense } from 'react'
import { BrowserRouter } from 'react-router'
import AppRoutes from '@/routes.jsx'

const App = () => {
    return (
        <Suspense>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
