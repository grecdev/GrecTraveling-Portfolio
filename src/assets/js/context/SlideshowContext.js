import React, { Component, createContext } from 'react';

export const SlideshowContext = createContext();

import { GlobalContext } from './GlobalContext';

export class SlideshowContextProvider extends Component {

	state = {
		incrementPos: 1,
		currentPos: 1,
		changingTime: 5000,
		transitionTime: 2200,
		images: ['amsterdam-showcase.jpg', 'paris-showcase.jpg', 'bali-showcase.jpg']
	};

	static contextType = GlobalContext;

	setPos = () => {
		if (this.state.currentPos < this.state.images.length - 1) this.setState(prevState => ({ currentPos: prevState.currentPos + this.state.incrementPos }));
		else this.setState({ currentPos: 0 });
	}

	changeSlideshow = value => this.setState({ currentPos: value });

	disableSelection = () => {
		document.querySelectorAll('.slideshow-btn').forEach(btn => {
			btn.setAttribute('data-event-toggle', 'false');

			setTimeout(() => btn.setAttribute('data-event-toggle', 'true'), this.state.transitionTime);
		});
	}

	render() {

		const { setPos, changeSlideshow, disableSelection } = this;

		return (
			<SlideshowContext.Provider value={{
				...this.state,
				setPos,
				changeSlideshow,
				disableSelection
			}}>
				{this.props.children}
			</SlideshowContext.Provider>
		)
	}
}

export default SlideshowContextProvider;
