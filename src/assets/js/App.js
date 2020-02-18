import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { GlobalContext } from './context/GlobalContext';

import Preloader from './components/global_layout/Preloader';

import Footer from './components/global_layout/Footer';
import Header from './components/global_layout/Header';
import ResetScroll from './components/global_layout/ResetScroll';

import HomePage from './components/pages/HomePage';
import RoomPage from './components/pages/RoomPage';

import ContactPage from './components/pages/ContactPage';
import FlightsPage from './components/pages/FlightsPage';
import HotelsPage from './components/pages/HotelsPage';
import NotFoundPage from './components/pages/NotFoundPage';

export class App extends Component {

	static contextType = GlobalContext;

	componentDidMount() {

		const {
			documentLoaded,
			headerFixed
		} = this.context

		documentLoaded && headerFixed();
	}

	render() {

		return (
			<>
				<Preloader />

				<Header />
				<Switch>
					<Route exact strict path={'/'} component={HomePage} />
					<Route exact strict path={'/contact'} component={ContactPage} />
					<Route exact strict path={'/flights'} component={FlightsPage} />
					<Route exact strict path={'/hotels'} component={HotelsPage} />

					<Route exact strict path={`/hotel-room/:room`} component={RoomPage} />

					<Route component={NotFoundPage} />
				</Switch>

				<ResetScroll />
				<Footer />
			</>
		)
	}
}

export default App;
