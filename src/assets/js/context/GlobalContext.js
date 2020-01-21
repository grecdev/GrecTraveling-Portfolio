import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

import { FormContext } from './FormContext';

class GlobalContextProvider extends Component {

	static contextType = FormContext;

	getImage = image => require(`../../media/${image}`);

	// Remove the unwanted page load transitions for animated elements
	removeTransitions = () => document.body.classList.remove('preload');

	headerFixed = e => {
		const pos = window.pageYOffset;

		pos > 1 ? document.querySelector('header').classList.add('header-fixed') : document.querySelector('header').classList.remove('header-fixed');

		if (document.body.id !== 'index') document.querySelector('header').classList.add('header-fixed');

		if (e.type === 'scroll') window.requestAnimationFrame(this.headerFixed);
	}

	parallaxBackground = (e) => {

		const pos = Math.floor(window.pageYOffset);

		if (e.type === 'scroll' || e.type === 'DOMContentLoaded') {
			document.querySelectorAll('.bg-parallax').forEach(bg => {

				if (bg.classList.contains('faq-image')) bg.style.backgroundPositionY = `${(pos * 0.4) - 250}px`;
				if (bg.id.includes('contact-us')) bg.style.backgroundPositionY = `${-(pos * 0.2)}px`;

			});
		}

		if (e.type === 'scroll') requestAnimationFrame(this.parallaxBackground);
	}

	loadEvent = e => {

		// Because it doesn't get the DOM elements immediately
		setTimeout(() => this.parallaxBackground(e), 150);

		this.removeTransitions();

		setTimeout(() => this.headerFixed(e), 150);

		e.stopPropagation();
	}

	scrollEvent = e => {
		this.headerFixed(e);

		this.parallaxBackground(e);

		e.stopPropagation();
	}

	clickEvent = e => {

		const {
			closeFormMenus,
			hotelCalendarCheckIn_visible,
			hotelCalendarCheckOut_visible,
			flightCalendarCheckIn_visible,
			flightCalendarCheckOut_visible,
			peopleSelection_visible } = this.context;

		// Because global click on document can overwrite other click events
		if (hotelCalendarCheckIn_visible || hotelCalendarCheckOut_visible || flightCalendarCheckIn_visible || flightCalendarCheckOut_visible || peopleSelection_visible) closeFormMenus(e);

		e.stopPropagation();
	}

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', this.loadEvent);
		document.addEventListener('click', this.clickEvent);

		window.addEventListener('scroll', this.scrollEvent);
	}

	componentWillUnmount() {
		document.removeEventListener('DOMContentLoaded', this.loadEvent);
		document.removeEventListener('click', this.clickEvent);

		window.removeEventListener('scroll', this.scrollEvent);
	}

	render() {

		return (
			<GlobalContext.Provider value={{
				...this.state,
				getImage: this.getImage,
				getRef: this.getRef
			}}>
				{this.props.children}
			</GlobalContext.Provider>
		)
	}
}

export default GlobalContextProvider;
