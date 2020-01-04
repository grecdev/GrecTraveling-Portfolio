import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../../context/global/GlobalContext';

const Header = () => {

	const { getImage } = useContext(GlobalContext);

	const headerFixed = () => {

		const pos = window.pageYOffset;

		pos > 1 ? document.querySelector('header').classList.add('header-fixed') : document.querySelector('header').classList.remove('header-fixed');

		window.requestAnimationFrame(headerFixed);
	}

	useEffect(() => {
		document.querySelectorAll('header li').forEach(link => {
			location.pathname.includes(link.textContent.toLowerCase()) || (location.pathname.includes('index') && link.textContent === 'Home') ? link.classList.add('active-page') : false;
		});

		if (!location.pathname.includes('index')) document.querySelector('header').classList.add('header-fixed');

		// When we load and don't scroll the header should be fixed
		headerFixed();
		window.addEventListener('scroll', headerFixed);

		return () => window.removeEventListener('scroll', () => headerFixed);
	}, []);

	return (
		<header className='p-1'>
			<div id="logo">
				<img src={getImage('header-logo.svg')} alt='header-logo' />
				<span>GrecTraveling</span>
			</div>

			<nav id='desktop-navbar'>
				<ul>
					<li><a href='index.html'>Home</a></li>
					<li><a href="#">Hotels</a></li>
					<li><a href="#">Flights</a></li>
					<li><a href="contact.html">Contact</a></li>
				</ul>
			</nav>
		</header >
	)
}

export default Header;
