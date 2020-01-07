import React, { Component } from 'react';

import Header from './components/global_layout/Header';
import Showcase from './components/pages/home/showcase/Showcase';
import ChooseUs from './components/pages/home/ChooseUs';
import MostVisited from './components/pages/home/MostVisited';
import History from './components/pages/home/History';
import CityBreaks from './components/pages/home/CityBreaks';

class HomePage extends Component {

	render() {
		return (
			<>
				<Header />
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
