import React, { useContext } from 'react';

import { FormContext } from '@context/FormContext';
import { GlobalContext } from '@context/GlobalContext';

import SearchLoader from '../SearchLoader';

import FilterSearch from './FilterSearch';
import FilterItemsWrapper from './FilterItemsWrapper';
import FilterEmpty from './FilterEmpty';


const FilterMainSection = () => {

	const {

		defaultFiltered_flights,
		defaultFiltered_hotels,
		searchLoader,
		filterLoader
		
	} = useContext(FormContext);

	const { location } = useContext(GlobalContext);

	const displayElements = () => {

		if (searchLoader) return <SearchLoader />

		if ((defaultFiltered_flights.length === 0 && location === '/flights') || (defaultFiltered_hotels.length === 0 && location === '/hotels')) {

			return <FilterEmpty flights={location === '/flights' && true} hotels={location === '/hotels' && true} />;
		}

		if ((defaultFiltered_flights.length > 0 && location === '/flights') || (defaultFiltered_hotels.length > 0 && location === '/hotels')) {

			return <section id='filters-container' className="p-2">
				<FilterSearch flights={defaultFiltered_flights.length > 0 && true} hotels={defaultFiltered_hotels.length > 0 && true} />

				{filterLoader ? <SearchLoader /> : <FilterItemsWrapper />}
			</section>
		}
	}

	return (
		<main id='filters-main-section'>

			{displayElements()}

		</main>
	)
}

export default FilterMainSection;
