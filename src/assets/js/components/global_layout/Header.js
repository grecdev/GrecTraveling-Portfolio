import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalContext';

const Header = () => {

	const { getImage, location } = useContext(GlobalContext);

	useEffect(() => {

		location !== '/' ? document.querySelector('header').classList.add('header-fixed', 'remove-transitions') : document.querySelector('header').classList.remove('header-fixed', 'remove-transitions');

	}, [location]);

	return (
		<header id='header' className='p-1'>
			<div id="logo">
				<img src={getImage('header-logo.svg')} alt='header-logo' />
				<span>GrecTraveling</span>
			</div>

			<nav id='desktop-navbar'>
				<NavLink exact to='/' activeClassName='active-page'>Home</NavLink>
				<NavLink to='/contact' activeClassName='active-page'>Contact</NavLink>
			</nav>
		</header >
	)
}

export default Header;
