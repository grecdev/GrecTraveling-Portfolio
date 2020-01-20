import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../../context/GlobalContext';

const Header = () => {

	const { getImage } = useContext(GlobalContext);

	useEffect(() => {

		// Active page link
		document.querySelectorAll('header li').forEach(link => {
			location.pathname.includes(link.textContent.toLowerCase()) || (document.body.id === 'index' && link.textContent === 'Home') ? link.classList.add('active-page') : false;
		});

	});

	return (
		<header className='p-1'>
			<div id="logo">
				<img src={getImage('header-logo.svg')} alt='header-logo' />
				<span>GrecTraveling</span>
			</div>

			<nav id='desktop-navbar'>
				<ul>
					<li><a href='index.html'>Home</a></li>
					<li><a href="contact.html">Contact</a></li>
				</ul>
			</nav>
		</header >
	)
}

export default Header;
