import React, { useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalContext';

const Header = () => {

	const { getImage, location, isMobile } = useContext(GlobalContext);

	useEffect(() => {

		if (!isMobile()) {

			location !== '/' ? document.querySelector('header').classList.add('header-fixed', 'remove-transitions') : document.querySelector('header').classList.remove('header-fixed', 'remove-transitions');
		}

		if (isMobile()) {

			document.querySelector('header').classList.add('header-fixed', 'remove-transitions');

			// So we reset the mobile menu
			document.querySelector('.mobile-navbar-container').classList.replace('display-flex', 'display-none');
			document.getElementById('show-mobileNavbar').setAttribute('data-navbar-toggle', 'true');
			document.getElementById('show-mobileNavbar').children[0].classList.replace('fa-caret-square-up', 'fa-caret-square-down');
		}

	}, [location]);

	const showMobileNavbar = e => {

		const toggle = e.target.dataset.navbarToggle || e.target.parentElement.dataset.navbarToggle;

		if (e.currentTarget.tagName === 'BUTTON') {

			if (toggle === 'true') {

				e.currentTarget.nextElementSibling.classList.replace('display-none', 'display-flex');

				e.currentTarget.setAttribute('data-navbar-toggle', 'false');

				e.currentTarget.children[0].classList.replace('fa-caret-square-down', 'fa-caret-square-up');

			} else {

				e.currentTarget.nextElementSibling.classList.replace('display-flex', 'display-none');

				e.currentTarget.setAttribute('data-navbar-toggle', 'true');

				e.currentTarget.children[0].classList.replace('fa-caret-square-up', 'fa-caret-square-down');
			}
		}

		e.stopPropagation();
	}

	return (
		<header id='header' className='p-1'>
			{!isMobile() ? (
				<>
					<Link to='/' id="logo">
						<img src={getImage('header-logo.svg')} alt='header-logo' />
						<span>GrecTraveling</span>
					</Link>

					<nav id='desktop-navbar'>
						<NavLink exact to='/' activeClassName='active-page'>Home</NavLink>
						<NavLink to='/flights' activeClassName='active-page'>Flights</NavLink>
						<NavLink to='/hotels' activeClassName='active-page'>Hotels</NavLink>
						<NavLink to='/contact' activeClassName='active-page'>Contact</NavLink>
					</nav>
				</>
			) : (
					<>
						<Link to='/' id="logo">
							<img src={getImage('header-logo.svg')} alt='header-logo' />
							<span>GrecTraveling</span>
						</Link>

						<nav id='mobile-navbar'>

							<button type='button' id='show-mobileNavbar' aria-label='show menu' aria-haspopup='true' className="mobile-navbar-icon" data-navbar-toggle='true' onClick={showMobileNavbar}>Menu <i className="ml-1 far fa-caret-square-down"></i></button>

							<div className="mobile-navbar-container p-1 display-none">
								<NavLink exact to='/' activeClassName='active-page'>Home</NavLink>
								<NavLink to='/flights' activeClassName='active-page'>Flights</NavLink>
								<NavLink to='/hotels' activeClassName='active-page'>Hotels</NavLink>
								<NavLink to='/contact' activeClassName='active-page'>Contact</NavLink>
							</div>
						</nav>
					</>
				)
			}
		</header >
	)
}

export default Header;
