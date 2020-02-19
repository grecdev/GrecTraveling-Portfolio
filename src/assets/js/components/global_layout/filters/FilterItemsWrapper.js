import React, { useContext, useEffect } from 'react';

import FilterNotFound from './FilterNotFound';

import FilterItemsFlights from '../../pages/flights/FilterItemsFlights';
import FilterItemsHotels from '../../pages/hotels/FilterItemsHotels';

import { GlobalContext } from '../../../context/GlobalContext';
import { FormContext } from '../../../context/FormContext';

const FilterItemsWrapper = () => {

	const { location } = useContext(GlobalContext);
	const {
		appliedFiltered_flights,
		appliedFiltered_hotels } = useContext(FormContext);

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

	const showFiltersMobile = e => {

		if (e.target.tagName === 'BUTTON' && document.body.contains(document.getElementById('filter-search-section'))) document.getElementById('filter-search-section').classList.remove('display-none');

		e.stopPropagation();
	}

	return (
		<aside id='filter-items-wrapper' className='p-1'>

			{window.matchMedia('(max-width: 1024px)').matches && <button id="show-filters-mobile" className='btn btn-blue' onClick={showFiltersMobile}><i className="fas fa-chevron-left"></i> Show filters</button>}

			{showItems()}

		</aside>
	)
}

export default FilterItemsWrapper;
