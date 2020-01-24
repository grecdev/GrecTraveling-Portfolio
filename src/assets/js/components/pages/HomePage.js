import React, { Component } from 'react';

import Showcase from './home/showcase/Showcase';
import ChooseUs from './home/ChooseUs';
import MostVisited from './home/MostVisited';
import History from './home/History';
import CityBreaks from './home/CityBreaks';

class HomePage extends Component {

	render() {
		return (
			<>
				<Showcase />
				<ChooseUs />
				<MostVisited />
				<History />
				<CityBreaks />
			</>
		)
	}
}

export default HomePage;
