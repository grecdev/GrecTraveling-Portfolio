import React, { Component } from 'react';

import FilterShowcase from '../global_layout/filters/FilterShowcase';
import FilterMainSection from '../global_layout/filters/FilterMainSection';

class FlightsPage extends Component {

	render() {
		return (
			<>
				<FilterShowcase flights={true} hotels={false} text='Flights Available' type='flights' />
				<FilterMainSection />
			</>
		)
	}
}

export default FlightsPage;
