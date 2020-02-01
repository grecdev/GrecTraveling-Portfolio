import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { GlobalContext } from './context/GlobalContext';

import HomePage from './components/pages/HomePage';
import ContactPage from './components/pages/ContactPage';
import FlightsPage from './components/pages/FlightsPage';
import HotelsPage from './components/pages/HotelsPage';
import NotFoundPage from './components/pages/NotFoundPage';

import Footer from './components/global_layout/Footer';
import Header from './components/global_layout/Header';

export class App extends Component {

	static contextType = GlobalContext;

	componentDidMount() {

		const {
			documentLoaded,
			headerFixed
		} = this.context

		documentLoaded && headerFixed()
	}

	render() {

		return (
			<>
				<Header />
				<Switch>
					<Route exact strict path={'/'} component={HomePage} />
					<Route exact strict path={'/contact'} component={ContactPage} />
					<Route exact strict path={'/flights'} component={FlightsPage} />
					<Route exact strict path={'/hotels'} component={HotelsPage} />

					<Route component={NotFoundPage} />
				</Switch>
				<Footer />
			</>
		)
	}
}

export default App;
