import { SidebarProvider, SidebarTrigger } from '../ui/sidebar.jsx'
import DashboardSidebar from '../common/dashboard-sidebar.jsx'

const DashboardLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main>
                <SidebarTrigger />
                <div className='mx-8'>{children}</div>
            </main>
        </SidebarProvider>
    );
}

export default DashboardLayout;
