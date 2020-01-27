import React, { useContext } from 'react';

import FilterItemsFlights from '../../pages/flights/FilterItemsFlights';
import FilterItemsHotels from '../../pages/hotels/FilterItemsHotels';

import { GlobalContext } from '../../../context/GlobalContext';

const FilterItemsWrapper = () => {

	const { location } = useContext(GlobalContext);

	return (
		<aside id='filter-items-wrapper' className='p-1'>

			{location === '/flights' && <FilterItemsFlights />}

			{location === '/hotels' && <FilterItemsHotels />}

		</aside>
	)
}

export default FilterItemsWrapper;
