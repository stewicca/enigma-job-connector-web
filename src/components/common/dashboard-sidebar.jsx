import { NavLink } from 'react-router';
import { Briefcase, LayoutDashboard, Users } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar.jsx';

const items = [
    {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'User',
        url: '/user',
        icon: Users,
    }
]

const DashboardSidebar = () => {
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader className='bg-spaceCadet py-4'>
                <div className='flex items-center justify-center text-lotion'>
                    <div className='flex items-center space-x-2'>
                        <Briefcase className='shrink-0 w-6 h-6' />
                        <span className='text-lg font-bold truncate transition-all group-data-[collapsible=icon]:hidden'>
                            ENIGJOB
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className='bg-spaceCadet text-lotion'>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-lotion'>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <NavLink to={item.url} className={({ isActive }) => isActive ? 'active' : ''}>
                                        {({ isActive }) => (
                                            <SidebarMenuButton isActive={isActive}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        )}
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default DashboardSidebar;
