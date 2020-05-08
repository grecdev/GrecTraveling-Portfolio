import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div className="container p-3 footer-container">
				<div><p>&copy; GrecTraveling | All rights Reserved 2020</p></div>

				<div className='footer-social'>
					<a aria-label='Github profile' rel="noopener" href='https://github.com/grecdev' target='_blank'><i className="fab fa-github"></i></a>
					<a aria-label='Instagram profile' className='mx-1' rel="noopener" href='https://www.instagram.com/grecdev1/?hl=en' target='_blank'><i className="fab fa-instagram"></i></a>
					<a aria-label='Linkedin profile' rel="noopener" href='https://www.linkedin.com/in/alexandru-constanin-grecu-7a570b14a/' target='_blank'><i className="fab fa-linkedin"></i></a>
				</div>
			</div>
		</footer>
	)
}

export default Footer;
