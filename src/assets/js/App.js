import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { GlobalContext } from './context/GlobalContext';

import Preloader from './components/global_layout/Preloader';

import Footer from './components/global_layout/Footer';
import Header from './components/global_layout/Header';
import ResetScroll from './components/global_layout/ResetScroll';

import ContactPage from './components/pages/ContactPage';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const RoomPage = lazy(() => import('./components/pages/RoomPage'));
const FlightsPage = lazy(() => import('./components/pages/FlightsPage'));
const HotelsPage = lazy(() => import('./components/pages/HotelsPage'));

import NotFoundPage from './components/pages/NotFoundPage';

export class App extends Component {

	static contextType = GlobalContext;

	render() {

		const { getImage } = this.context;

		return (
			<>
				<Preloader />

				<Header />
				<Suspense fallback={<div id='suspense-big-loader'><img src={getImage('search-loader.gif')} alt='suspense loader' /></div>}>
					<Switch>
						<Route exact strict path={'/'} component={HomePage} />
						<Route exact strict path={'/contact'} component={ContactPage} />
						<Route exact strict path={'/flights'} component={FlightsPage} />
						<Route exact strict path={'/hotels'} component={HotelsPage} />
						<Route exact strict path={`/hotel-room/:room`} component={RoomPage} />

						<Route component={NotFoundPage} />
					</Switch>
				</Suspense >

				{/* <div id='suspense-big-loader'><img src={getImage('search-loader.gif')} alt='suspense loader' /></div> */}

				<ResetScroll />
				<Footer />
			</>
		)
	}
}

export default App;
