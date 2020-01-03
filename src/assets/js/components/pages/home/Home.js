import React, { Component } from 'react';

import Showcase from './showcase/Showcase';
import Choose from './choose/Choose';
import MostVisited from './most_visited/MostVisited';

class Home extends Component {
	render() {
		return (
			<>
				<Showcase />
				<Choose />
				<MostVisited />
			</>
		)
	}
}

export default Home;
