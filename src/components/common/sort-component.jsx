import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp } from 'lucide-react';

const SortComponent = ({ name, field, sortDirection, onSort }) => {
    return (
        <button onClick={() => onSort(field)} className='flex items-center gap-1'>
            <span>{name}</span>
            {sortDirection.field === field && sortDirection.direction === 'asc' && <ArrowDown size='16' />}
            {sortDirection.field === field && sortDirection.direction === 'desc' && <ArrowUp size='16' />}
        </button>
    );
}

SortComponent.propTypes = {
    name: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    sortDirection: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
}

export default SortComponent;
