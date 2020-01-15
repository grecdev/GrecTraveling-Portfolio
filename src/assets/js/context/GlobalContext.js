import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {

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

		if (e.type === 'scroll' || e.type === 'DOMContentLoaded') {
			document.querySelectorAll('.bg-parallax').forEach(bg => {

				const elHeight = Math.floor(parseFloat(window.getComputedStyle(bg).height));

				const posY = Math.floor(bg.getBoundingClientRect().top - elHeight) / 3;

				bg.style.backgroundPositionY = `${posY}px`;

			});
		}

		if (e.type === 'scroll') requestAnimationFrame(this.parallaxBackground);
	}

	loadEvent = e => {
		this.parallaxBackground(e);

		this.removeTransitions();

		setTimeout(() => this.headerFixed(e), 150);

		e.stopPropagation();
	}

	scrollEvent = e => {
		this.headerFixed(e);

		this.parallaxBackground(e);

		e.stopPropagation();
	}

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', this.loadEvent);

		window.addEventListener('scroll', this.scrollEvent);
	}

	componentWillUnmount() {
		document.removeEventListener('DOMContentLoaded', this.loadEvent);

		window.removeEventListener('scroll', this.scrollEvent);
	}

	render() {

		return (
			<GlobalContext.Provider value={{
				...this.state,
				getImage: this.getImage
			}}>
				{this.props.children}
			</GlobalContext.Provider>
		)
	}
}

export default GlobalContextProvider;
