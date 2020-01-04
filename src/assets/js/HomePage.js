import React, { Component } from 'react';

import Header from './components/global_layout/Header';
import Home from './components/pages/home/Home';

class HomePage extends Component {
	render() {
		return (
			<>
				<Header />
				<Home />
			</>
		)
	}
}

export default HomePage;
