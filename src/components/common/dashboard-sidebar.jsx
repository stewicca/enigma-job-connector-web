import { NavLink } from 'react-router';
import { LogOut, Users, NotebookText, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar.jsx';
import PropTypes from "prop-types";

const items = [
    {
        title: 'Category',
        url: '/category',
        icon: NotebookText,
    },
    {
        title: 'User',
        url: '/user',
        icon: Users,
    },
    {
        title: 'Client',
        url: '/client',
        icon: Building2,
    }
]

const DashboardSidebar = ({ onLogout }) => {
    return (
        <Sidebar>
            <SidebarHeader className='hidden md:block'>
                <NavLink to='#' className='flex justify-center w-full py-5'>
                    <span className='text-spaceCadet text-sm font-extrabold'>ENIGJOB</span>
                </NavLink>
            </SidebarHeader>
            <SidebarContent className='bg-spaceCadet text-lotion md:rounded-tr-full py-4 md:py-10'>
                <SidebarMenu>
                    <SidebarMenuItem className='hidden md:block'>
                        <NavLink to='#' className='flex justify-center w-full py-5'>
                            <Avatar>
                                <AvatarImage src='https://github.com/shadcn.png' />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                        </NavLink>
                    </SidebarMenuItem>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <NavLink
                                to={item.url}
                                className={({ isActive }) =>
                                    `flex md:justify-center items-center gap-4 w-full px-4 py-2 md:py-5 mx-auto relative ${
                                        isActive ? 'after:content-[""] after:absolute after:right-1 after:top-0 after:h-full after:w-1 after:bg-lotion' : ''
                                    }`
                                }
                            >
                                <item.icon size='32'/>
                                <span className='md:hidden text-lg font-extrabold'>{item.title}</span>
                            </NavLink>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className='bg-spaceCadet text-lotion'>
                <button onClick={() => onLogout()} className='flex md:justify-center items-center gap-4 w-full px-4 py-2 md:py-5 mx-auto'>
                    <LogOut size='32'/>
                    <span className='md:hidden text-lg font-extrabold'>LogOut</span>
                </button>
            </SidebarFooter>
        </Sidebar>
    );
};

DashboardSidebar.propTypes = {
    onLogout: PropTypes.func.isRequired,
}

export default DashboardSidebar;
