import React, { useContext } from 'react';

import SearchLoader from '../SearchLoader';

import FilterNotFound from './FilterNotFound';

import FilterItemsFlights from '../../pages/flights/FilterItemsFlights';
import FilterItemsHotels from '../../pages/hotels/FilterItemsHotels';

import { GlobalContext } from '../../../context/GlobalContext';
import { FormContext } from '../../../context/FormContext';

const FilterItemsWrapper = () => {

	const { location } = useContext(GlobalContext);
	const { appliedFiltered_flights } = useContext(FormContext);

	const showItems = () => {

		if (location === '/flights') {
			if (appliedFiltered_flights.length > 0) return <FilterItemsFlights />
			else return <FilterNotFound />
		}

		if (location === '/hotels') {
			if (appliedFiltered_hotels.length > 0) return <FilterItemsHotels />
			else return <FilterNotFound />
		}

	};

	return (
		<aside id='filter-items-wrapper' className='p-1'>

			{showItems()}

		</aside>
	)
}

export default FilterItemsWrapper;
