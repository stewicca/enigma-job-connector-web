import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';

const SearchBar = ({ placeholder, onChangeSearchParams }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        onChangeSearchParams(inputValue);
    };

    return (
        <div className='flex w-full max-w-sm items-center space-x-2 bg-white/50 rounded-xl p-2'>
            <Input
                type='text'
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                className='bg-opacity-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <Button
                variant='secondary'
                className='text-lotion'
                onClick={handleSearchClick}
            >
                <Search />
            </Button>
        </div>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    onChangeSearchParams: PropTypes.func.isRequired
};

export default SearchBar;
