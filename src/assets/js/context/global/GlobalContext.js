import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {

	getImage = image => require(`../../../media/${image}`);

	// Remove the unwanted page load transitions for animated elements
	removeTransitions = () => document.body.classList.remove('preload');

	headerFixed = e => {
		const pos = window.pageYOffset;

		pos > 1 ? document.querySelector('header').classList.add('header-fixed') : document.querySelector('header').classList.remove('header-fixed');

		if (document.body.id !== 'index') document.querySelector('header').classList.add('header-fixed');

		if (e.type === 'scroll') window.requestAnimationFrame(this.headerFixed);
	}

	componentDidMount() {

		document.addEventListener('DOMContentLoaded', e => {
			this.removeTransitions();

			this.headerFixed(e);

			e.stopPropagation();
		});

		window.addEventListener('scroll', e => {
			this.headerFixed(e);

			e.stopPropagation();
		});

	}

	componentWillUnmount() {
		document.removeEventListener('DOMContentLoaded', e => {
			this.removeTransitions();
			this.headerFixed(e);
		});

		window.removeEventListener('scroll', e => this.headerFixed(e));
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
