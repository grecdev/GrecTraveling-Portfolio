import React, { Component } from 'react';

import FilterShowcase from '../global_layout/filters/FilterShowcase';
import FilterMainSection from '../global_layout/filters/FilterMainSection';
import FilterSearchMobile from '../global_layout/filters/FilterSearchMobile';

export class HotelsPage extends Component {

	render() {
		return (
			<>
				<FilterShowcase flights={false} hotels={true} text={'Hotels Available'} type={'hotels'} />
				<FilterMainSection />

				{window.matchMedia('(max-width: 1024px)').matches && <FilterSearchMobile />}
			</>
		)
	}
}

export default HotelsPage;
