import React, { useContext } from 'react';

import { GlobalContext } from '../../context/GlobalContext';

const Header = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<header className='p-1'>
			<div id="logo">
				<img src={getImage('header-logo.svg')} alt='header-logo' />
				<span>GrecTraveling</span>
			</div>

			<nav id='desktop-navbar'>
				<ul>
					<li className='active-page'><a href='#'>Home</a></li>
					<li><a href="#">Hotels</a></li>
					<li><a href="#">Flights</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;
