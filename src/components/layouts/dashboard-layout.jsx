import PropTypes from 'prop-types';
import { useNavigate } from "react-router";
import { useFetch } from "@/hooks/use-fetch.js";
import { useToast } from "@/hooks/use-toast.js";
import { HTTP_METHODS } from "@/lib/constant.js";
import { getErrorMessage } from "@/lib/get-error-message.js";
import DashboardSidebar from '@/components/common/dashboard-sidebar.jsx';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.jsx';

// API URL
const LOGOUT_API_URL = '/api/auth/logout';

const DashboardLayout = ({ children }) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { mutateAsync: logout } = useFetch(HTTP_METHODS.POST, LOGOUT_API_URL);

    const handleLogout = async () => {
        try {
            const { message } = await logout();
            sessionStorage.removeItem('accessToken');
            toast({ description: message });
            navigate('/login', { replace: true });
        } catch (error) {
            toast({ variant: 'destructive', description: getErrorMessage(error) });
        }
    }

    return (
        <SidebarProvider>
            <DashboardSidebar onLogout={handleLogout} />
            <main className="w-full">
                <SidebarTrigger className='md:hidden' />
                <div className="max-w-[90%] mx-auto">{children}</div>
            </main>
        </SidebarProvider>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
