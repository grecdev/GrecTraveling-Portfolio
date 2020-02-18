import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div className="container p-3 footer-container">
				<div><p>&copy; GrecTraveling | All rights Reserved</p></div>

				<div className='footer-social'>
					<a href='https://github.com/grecdev' target='_blank'><i className="fab fa-github"></i></a>
					<a className='mx-1' href='https://www.instagram.com/grecdev1/?hl=en' target='_blank'><i className="fab fa-instagram"></i></a>
					<a href='https://www.linkedin.com/in/alexandru-constanin-grecu-7a570b14a/' target='_blank'><i className="fab fa-linkedin"></i></a>
				</div>
			</div>
		</footer>
	)
}

export default Footer;
