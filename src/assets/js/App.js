import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { GlobalContext } from './context/GlobalContext';

import HomePage from './components/pages/HomePage';
import ContactPage from './components/pages/ContactPage';

import Footer from './components/global_layout/Footer';
import Header from './components/global_layout/Header';

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
				<Header />
				<Switch>
					<Route exact strict path={'/'} component={HomePage} />
					<Route exact strict path={'/contact'} component={ContactPage} />

					<Route>
						<h1>404 PAGE NOT FOUND</h1>
					</Route>
				</Switch>
				<Footer />
			</>
		)
	}
}

export default App;
