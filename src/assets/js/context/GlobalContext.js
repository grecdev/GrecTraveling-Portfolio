import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	state = {
		location: this.props.location.pathname,
		outerClick: false,
		documentLoaded: false,
		formState: undefined,
		pageChanged: false,
		windowBlur: false,
		pageLoaded: false
	}

	getImage = image => require(`../../media/${image}`);

	// Remove the unwanted page load transitions for animated elements
	removeTransitions = () => document.body.classList.remove('remove-transitions');

	// For react-router-dom version ^4
	changePage = page => this.props.history.push(page);

	headerFixed = () => {
		const pos = window.pageYOffset;

		if (this.state.location === '/') {
			pos > 1 ? document.querySelector('header').classList.add('header-fixed') : document.querySelector('header').classList.remove('header-fixed');
		}

		window.requestAnimationFrame(this.headerFixed);
	}

	parallaxBackground = () => {

		const pos = Math.floor(window.pageYOffset);

		document.querySelectorAll('.bg-parallax').forEach(bg => {

			if (bg.classList.contains('faq-image')) bg.style.backgroundPositionY = `${(pos * 0.4) - 250}px`;
			if (bg.id.includes('contact-us')) bg.style.backgroundPositionY = `${(pos * 0.3)}px`;

		});

		window.requestAnimationFrame(this.parallaxBackground);
	}

	contentLoadedEvent = e => {

		// When we can't access some DOM elements
		document.readyState === 'interactive' && this.setState(prevState => ({ documentLoaded: !prevState.documentLoaded }));

		this.parallaxBackground();

		this.props.location.pathname !== '/' ? document.body.classList.add('header-spacing') : document.body.classList.remove('header-spacing');

		e.stopPropagation();
	}

	scrollEvent = e => {
		this.headerFixed();

		this.parallaxBackground();

		e.stopPropagation();
	}

	hideMenus = e => {
		// Checking for ids
		const regex = /checkin|checkout|people|passengers/gi;

		if ((!e.target.closest('.calendar') && !e.target.closest('.people-selection')) && (!regex.test(e.target.id) && !regex.test(e.target.getAttribute('for')))) {
			this.setState({ outerClick: true });

			setTimeout(() => this.setState({ outerClick: false }), 1);
			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}
	}

	clickEvent = e => {

		this.hideMenus(e);

		e.stopPropagation();
	}

	blurEvent = () => {

		document.body.classList.add('remove-transitions');
		this.setState({ windowBlur: true });

		setTimeout(() => this.setState({ windowBlur: false }), 150);
	}

	focusEvent = () => {

		setTimeout(() => this.removeTransitions(), 150);
	}

	enablePreloader = () => {

		document.getElementById('preloader').classList.remove('preloader-hidden', 'display-none');

		setTimeout(() => this.hidePreloader(), 1000);
	}

	hidePreloader = () => {

		document.getElementById('preloader').classList.add('preloader-hidden');
		setTimeout(() => document.getElementById('preloader').classList.add('display-none'), 500);
	}

	loadEvent = () => {

		this.removeTransitions();
		this.hidePreloader();
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.clickEvent);
		document.addEventListener('DOMContentLoaded', this.contentLoadedEvent);

		window.addEventListener('scroll', this.scrollEvent);
		window.addEventListener('blur', this.blurEvent);
		window.addEventListener('focus', this.focusEvent);
		window.addEventListener('load', this.loadEvent);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.clickEvent);
		document.removeEventListener('DOMContentLoaded', this.contentLoadedEvent);

		window.removeEventListener('scroll', this.scrollEvent);
		window.removeEventListener('blur', this.blurEvent);
		window.removeEventListener('focus', this.focusEvent);
		window.removeEventListener('load', this.loadEvent);
	}

	componentDidUpdate(prevProps) {

		if (this.props.location !== prevProps.location) {
			this.setState({ location: this.props.location.pathname });

			this.setState({ pageChanged: true });

			setTimeout(() => this.setState({ pageChanged: false }), 150);

			this.enablePreloader();

			this.props.location.pathname !== '/' ? document.body.classList.add('header-spacing') : document.body.classList.remove('header-spacing');
		}
	}

	render() {

		const { getImage, headerFixed, resetOuterClick, changePage, test } = this;

		return (
			<GlobalContext.Provider value={{
				...this.state,
				getImage,
				headerFixed,
				resetOuterClick,
				changePage
			}}>
				{this.props.children}
			</GlobalContext.Provider>
		)
	}
}

export default withRouter(GlobalContextProvider);
