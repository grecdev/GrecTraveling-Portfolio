import React, { Component } from 'react';

import FilterShowcase from '../global_layout/filters/FilterShowcase';
import FilterMainSection from '../global_layout/filters/FilterMainSection';

export class HotelsPage extends Component {

	render() {
		return (
			<>
				<FilterShowcase flights={false} hotels={true} text={'Hotels Available'} type={'hotels'} />
				<FilterMainSection />
			</>
		)
	}
}

export default HotelsPage;
