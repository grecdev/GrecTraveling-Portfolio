import React, { Component, createContext } from 'react';

export const SlideshowContext = createContext();

export class SlideshowContextProvider extends Component {

	state = {
		incrementPos: 1,
		currentPos: 1,
		changingTime: 5000
	}

	setPos = () => {
		if (this.state.currentPos < 2) this.setState(prevState => ({ currentPos: prevState.currentPos + this.state.incrementPos }));
		else this.setState({ currentPos: 0 });
	}

	render() {

		const { setPos } = this;

		return (
			<SlideshowContext.Provider value={{
				...this.state,
				setPos
			}}>
				{this.props.children}
			</SlideshowContext.Provider>
		)
	}
}

export default SlideshowContextProvider;
