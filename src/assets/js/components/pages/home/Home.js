import React, { Component } from 'react';

import Showcase from './showcase/Showcase';
import Choose from './choose/Choose';

class Home extends Component {
	render() {
		return (
			<>
				<Showcase />

				<Choose />
			</>
		)
	}
}

export default Home;
