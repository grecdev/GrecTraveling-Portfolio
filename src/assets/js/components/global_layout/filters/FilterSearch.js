import React from 'react';
import PropTypes from 'prop-types';

import FilterSearchFlights from '@components/pages/flights/FilterSearchFlights';
import FilterSearchHotels from '@components/pages/hotels/FilterSearchHotels';

const FilterSearch = ({ flights, hotels }) => {

	return (
		window.matchMedia('(min-width: 1025px)').matches && (
			<aside id='filter-search-section' className='desktop-filters px-1'>

				{flights && <FilterSearchFlights />}
				{hotels && <FilterSearchHotels />}

			</aside>
		)
	)
}

FilterSearch.propTypes = {
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired
}

export default FilterSearch
