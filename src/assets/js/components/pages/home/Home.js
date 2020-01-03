import React, { Component } from 'react';

import Showcase from './showcase/Showcase';
import ChooseUs from './choose_us/ChooseUs';
import MostVisited from './most_visited/MostVisited';
import History from './history/History';
import CityBreaks from './city_breaks/CityBreaks';

class Home extends Component {
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

export default Home;
