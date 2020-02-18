import React from 'react';
import PropTypes from 'prop-types';

import FilterSearchFlights from '../../pages/flights/FilterSearchFlights';
import FilterSearchHotels from '../../pages/hotels/FilterSearchHotels';

const FilterSearch = ({ flights, hotels }) => {
	return (
		<aside id='filter-search-section' className='px-1'>

			{flights && <FilterSearchFlights />}
			{hotels && <FilterSearchHotels />}

		</aside>
	)
}

FilterSearch.propTypes = {
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired
}

export default FilterSearch
