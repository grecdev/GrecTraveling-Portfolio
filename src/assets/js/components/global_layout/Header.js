import React, { useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalContext';

const Header = () => {

	const { getImage, location, isMobile } = useContext(GlobalContext);

	useEffect(() => {

		location !== '/' ? document.querySelector('header').classList.add('header-fixed', 'remove-transitions') : document.querySelector('header').classList.remove('header-fixed', 'remove-transitions');

		isMobile() && document.querySelector('header').classList.add('header-fixed', 'remove-transitions');

	}, [location]);

	return (
		<header id='header' className='p-1'>
			{window.matchMedia('(min-width: 1024px)').matches ? (
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

							<button type='button' aria-label='show menu' aria-haspopup='true' className="mobile-navbar-icon"><i className="fas fa-bars"></i></button>

							<div className="mobile-navbar-container display-none">
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
