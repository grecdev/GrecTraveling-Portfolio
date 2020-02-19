import React, { Component } from 'react';

import FilterShowcase from '../global_layout/filters/FilterShowcase';
import FilterMainSection from '../global_layout/filters/FilterMainSection';
import FilterSearchMobile from '../global_layout/filters/FilterSearchMobile';

class FlightsPage extends Component {

	render() {

		return (
			<>
				<FilterShowcase flights={true} hotels={false} text='Flights Available' type='flights' />
				<FilterMainSection />

				{window.matchMedia('(max-width: 1024px)').matches && <FilterSearchMobile />}
			</>
		)
	}
}

export default FlightsPage;
