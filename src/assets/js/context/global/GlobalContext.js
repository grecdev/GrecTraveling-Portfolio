import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {

	getImage = image => require(`../../../media/${image}`);

	componentDidMount() {
		document.addEventListener('DOMContentLoaded', () => {
			// Remove the unwanted page load transitions for animated elements
			document.body.classList.remove('preload');
		});

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
