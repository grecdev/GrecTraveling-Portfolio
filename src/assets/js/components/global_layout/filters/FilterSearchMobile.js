import React, { useContext } from 'react';

import { FormContext } from '@context/FormContext';

import FilterSearchFlights from '@components/pages/flights/FilterSearchFlights';
import FilterSearchHotels from '@components/pages/hotels/FilterSearchHotels';

const FilterSearchMobile = () => {

	const {
		defaultFiltered_flights,
		defaultFiltered_hotels
	} = useContext(FormContext);

	const closeMobileFilters = e => {

		if (e.target.id === 'close-filters-button' || e.target.parentElement.id === 'close-filters-button' || e.target.id === 'filter-search-section') document.getElementById('filter-search-section').classList.add('display-none');

		e.stopPropagation();
	}

	return (
		<section id='filter-search-section' className='mobile-filters display-none' onClick={closeMobileFilters} >
			<button type='button' id='close-filters-button' aria-label='close button'><i className="far fa-times-circle"></i></button>

			{defaultFiltered_flights.length > 0 && <FilterSearchFlights />}
			{defaultFiltered_hotels.length > 0 && <FilterSearchHotels />}
		</section>
	)
}

export default FilterSearchMobile
