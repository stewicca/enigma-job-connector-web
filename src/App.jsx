import { Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from '@/routes.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';

const queryClient = new QueryClient();

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
                <Toaster />
            </QueryClientProvider>
        </Suspense>
    );
};

export default App;
