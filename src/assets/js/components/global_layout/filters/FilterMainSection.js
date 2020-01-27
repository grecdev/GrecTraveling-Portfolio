import React, { useContext } from 'react';

import { FormContext } from '../../../context/FormContext';

import FilterSearch from './FilterSearch';
import FilterItemsWrapper from './FilterItemsWrapper';
import FilterEmpty from './FilterEmpty';

const FilterMainSection = () => {

	const {
		filtered_flights,
		filtered_hotels
	} = useContext(FormContext);

	return (
		<main id='filters-main-section'>
			{filtered_flights.length > 0 || filtered_hotels.length > 0 ? (
				<section id='filters-container' className="p-2">
					<FilterSearch flights={filtered_flights.length > 0 && true} hotels={filtered_hotels.length > 0 && true} />

					<FilterItemsWrapper />
				</section>
			) : <FilterEmpty />}
		</main>
	)
}

export default FilterMainSection;
