import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {

	getImage = image => require(`../../../media/${image}`);

	// Remove the unwanted page load transitions for animated elements
	removeTransitions = () => document.body.classList.remove('preload');

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', () => {
			this.removeTransitions();
		});
	}

	componentWillUnmount() {

		document.removeEventListener('DOMContentLoaded', () => this.removeTransitions());
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
