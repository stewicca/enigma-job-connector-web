import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button.jsx';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.jsx';
import PropTypes from "prop-types";

const UserList = ({ data, handleDelete, handleChangePage }) => {
    return (
        <>
            <div className='mb-4 flex items-center justify-between'>
                <h1 className='text-3xl font-bold mb-6'>Users</h1>
                <NavLink to='/user/add'>
                    <Button>Add User</Button>
                </NavLink>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant='ghost' className='h-8 w-8 p-0'>
                                            <span className='sr-only'>Open menu</span>
                                            <MoreHorizontal className='h-4 w-4'/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end'>
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <NavLink to={`/user/edit/${user.id}`}>
                                            <DropdownMenuItem>
                                                <Pencil className='mr-2 h-4 w-4'/>
                                                Edit
                                            </DropdownMenuItem>
                                        </NavLink>
                                        <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                                            <Trash className='mr-2 h-4 w-4'/>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='mt-4 flex items-center justify-between'>
                <div>Showing {data.data.length} of {data.page.totalItems} users</div>
                <div className='flex gap-2'>
                    <Button disabled={data.page.page === 1} onClick={() => handleChangePage(data.page.page - 1)}>Previous</Button>
                    <Button disabled={data.page.page === data.page.totalPages} onClick={() => handleChangePage(data.page.page + 1)}>Next</Button>
                </div>
            </div>
        </>
    );
}

UserList.propTypes = {
    data: PropTypes.shape({
        data: PropTypes.array,
        page: PropTypes.shape({
            page: PropTypes.number,
            totalPages: PropTypes.number,
            totalItems: PropTypes.number
        })
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired
}

export default UserList;
