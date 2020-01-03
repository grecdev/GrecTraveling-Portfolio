import React, { Component } from 'react';

import Header from './components/global_layout/Header';
import Footer from './components/global_layout/Footer';
import Home from './components/pages/home/Home';

class App extends Component {
	render() {
		return (
			<>
				<Header />
				<Home />
				<Footer />
			</>
		)
	}
}

export default App;
