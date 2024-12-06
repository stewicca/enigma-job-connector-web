import PropTypes from 'prop-types';
import DashboardSidebar from '@/components/common/dashboard-sidebar.jsx';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.jsx';

const DashboardLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <div className="mx-8 py-10">{children}</div>
            </main>
        </SidebarProvider>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
