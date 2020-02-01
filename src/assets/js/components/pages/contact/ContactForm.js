import React, {useContext} from 'react';

import {FormContext} from '../../../context/FormContext';

const ContactForm = () => {

	const {regexValidation} = useContext(FormContext);

	return (
		<section id='contact-us' className='bg-parallax overlay overlay-dark'>
			<div className="contact-us-container">
				<div className="contact-us-info text-center p-3">

					<h2 className='heading heading-1 mb-1'>Contact Us</h2>

					<ul>
						<li className='mb-1'><span><i className="fas fa-map-marker-alt"></i></span> Some street, no. 1</li>
						<li className='mb-1'><span><i className="fas fa-phone-alt"></i></span> (+40) 123-456-789</li>
						<li className='mb-1'><span><i className="far fa-envelope"></i></span> grecdev1@gmail.com</li>
					</ul>
				</div>

				<form name='contact-us' className='p-3'>
					<div className="form-box mb-2">
						<input id='full-name' type="text" placeholder='Full Name' name='full-name' onBlur={regexValidation}/>
						<input id='email' type="text" placeholder='Email' name='email' onBlur={regexValidation}/>
					</div>

					<div className="form-box mb-2">
						<textarea placeholder='Your message' id='message' name="message" id="message" cols="30" rows="10" onBlur={regexValidation}></textarea>
					</div>

					<button className='btn btn-blue' type='submit'>Send Message</button>
				</form>
			</div>
		</section>
	)
}

export default ContactForm;
