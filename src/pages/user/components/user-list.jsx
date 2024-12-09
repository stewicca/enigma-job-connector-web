import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import SearchBar from '@/components/common/search-bar.jsx';
import SortComponent from '@/components/common/sort-component.jsx';
import { importUserFormSchema } from '@/pages/user/schema/index.js';
import { FolderDown, Import, MoreHorizontal, Pencil, Trash, UserPlus } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.jsx';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';

const UserList = ({ data, onDelete, onChangePage, onExport, onImport, onChangeSearchParams, sortDirection, onSort }) => {
    const form = useForm({
        resolver: zodResolver(importUserFormSchema)
    });

    const handleSubmit = async (values) => {
        await onImport(values);
    }

    return (
        <div className='flex flex-col gap-6 py-5'>
            <div className='flex items-center justify-between'>
                <SearchBar placeholder='Search user' onChangeSearchParams={onChangeSearchParams} />
                <div className='flex gap-2'>
                    <Button onClick={() => onExport()} variant='secondary' size='lg' className='px-4 lg:px-8'>
                        <span className='hidden md:block'>Export User</span>
                        <FolderDown className='md:hidden' />
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='secondary' size='lg' className='px-4 lg:px-8'>
                                <span className='hidden md:block'>Import User</span>
                                <Import className='md:hidden' />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px] bg-brightGray'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-5 py-4'>
                                    <DialogHeader>
                                        <DialogTitle className='text-beer'>Import Users</DialogTitle>
                                    </DialogHeader>
                                        <FormField
                                            control={form.control}
                                            name='file'
                                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...fieldProps}
                                                            type='file'
                                                            className='focus-visible:ring-beer'
                                                            onChange={(event) =>
                                                                onChange(event.target.files && event.target.files[0])
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button type='submit' variant='secondary'>Save changes</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                    <Link to='/user/add'>
                        <Button variant='secondary' size='lg' className='px-4 lg:px-8'>
                            <span className='hidden md:block'>Add User</span>
                            <UserPlus className='md:hidden' />
                        </Button>
                    </Link>
                </div>
            </div>
            <h1 className='text-beer text-2xl font-bold'>Users</h1>
            <div className='flex flex-col gap-6'>
                <div className='hidden lg:grid grid-cols-5 gap-4 px-6 py-4 font-bold'>
                    <SortComponent name='Name' field='name' sortDirection={sortDirection} onSort={onSort} />
                    <SortComponent name='Username' field='username' sortDirection={sortDirection} onSort={onSort} />
                    <SortComponent name='Email' field='email' sortDirection={sortDirection} onSort={onSort} />
                    <SortComponent name='Role' field='role' sortDirection={sortDirection} onSort={onSort} />
                    <span>Category</span>
                </div>
                {data.data.map((user) => (
                    <div
                        className='relative grid md:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-4 bg-lotion rounded-xl lg:hover:bg-spaceCadet lg:hover:text-lotion lg:hover:scale-105 transition-all'
                        key={user.id}>
                        <div className='flex flex-col'>
                            <span className='lg:hidden text-beer text-sm'>Name</span>
                            <span>{user.name}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='lg:hidden text-beer text-sm'>Username</span>
                            <span>{user.username}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='lg:hidden text-beer text-sm'>Email</span>
                            <span>{user.email}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='lg:hidden text-beer text-sm'>Role</span>
                            <span>{user.role}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='lg:hidden text-beer text-sm'>Category</span>
                            <span>{user.category.name}</span>
                        </div>
                        <div className='absolute right-4 lg:right-10 top-4 lg:top-1/2 lg:-translate-y-1/2'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant='ghost' className='h-8 w-8 p-0'>
                                        <span className='sr-only'>Open menu</span>
                                        <MoreHorizontal className='h-4 w-4'/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <Link to={`/user/edit/${user.id}`}>
                                        <DropdownMenuItem>
                                            <Pencil className='mr-2 h-4 w-4'/>
                                            Edit
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={() => onDelete(user.id)}>
                                        <Trash className='mr-2 h-4 w-4'/>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-4 flex items-center justify-between'>
                <div className='text-sm md:text-base'>Showing {data.data.length} of {data.page.totalItems} users</div>
                <div className='flex gap-2'>
                    <Button variant='secondary' disabled={data.page.page === 1} onClick={() => onChangePage(data.page.page - 1)}>Previous</Button>
                    <Button variant='secondary' disabled={data.page.page === data.page.totalPages || data.page.totalPages === 0} onClick={() => onChangePage(data.page.page + 1)}>Next</Button>
                </div>
            </div>
        </div>
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
    onDelete: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
    onChangeSearchParams: PropTypes.func.isRequired,
    sortDirection: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
}

export default UserList;
