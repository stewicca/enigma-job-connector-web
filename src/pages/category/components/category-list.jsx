import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button.jsx';
import SearchBar from '@/components/common/search-bar.jsx';
import SortComponent from '@/components/common/sort-component.jsx';
import { MoreHorizontal, Pencil, PlusCircle, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';

const CategoryList = ({ data, onDelete, onChangeSearchParams, sortDirection, onSort }) => {
    return (
        <div className='flex flex-col gap-6 py-5'>
            <div className='flex items-center justify-between'>
                <SearchBar placeholder='Search category' onChangeSearchParams={onChangeSearchParams}/>
                <Link to='/category/add'>
                    <Button variant='secondary' size='lg' className='px-4 lg:px-8'>
                        <span className='hidden md:block'>Add Category</span>
                        <PlusCircle className='md:hidden'/>
                    </Button>
                </Link>
            </div>
            <h1 className='text-beer text-2xl font-bold'>Category</h1>
            <div className='flex flex-col gap-6'>
                <div className='hidden lg:grid grid-cols-5 gap-4 px-6 py-4 font-bold'>
                    <span>No</span>
                    <SortComponent name='Name' field='name' sortDirection={sortDirection} onSort={onSort} />
                </div>
                {data.map((category, index) => (
                    <div className='relative grid md:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-4 bg-lotion rounded-xl lg:hover:bg-spaceCadet lg:hover:text-lotion lg:hover:scale-105 transition-all' key={category.id}>
                        <div className='flex flex-col'>
                            <span className='lg:hidden text-beer text-sm'>No</span>
                            <span>{index + 1}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='lg:hidden text-beer text-sm'>Name</span>
                            <span>{category.name}</span>
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
                                    <Link to={`/category/edit/${category.id}`}>
                                        <DropdownMenuItem>
                                            <Pencil className='mr-2 h-4 w-4'/>
                                            Edit
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={() => onDelete(category.id)}>
                                        <Trash className='mr-2 h-4 w-4'/>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

CategoryList.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onChangeSearchParams: PropTypes.func.isRequired,
    sortDirection: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
}

export default CategoryList;
