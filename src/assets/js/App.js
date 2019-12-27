import React, { Component } from 'react';

import Header from './components/global_layout/Header';
import Home from './components/pages/home/Home';

class App extends Component {
	render() {
		return (
			<>
				<Header />
				<Home />
			</>
		)
	}
}

export default App;
