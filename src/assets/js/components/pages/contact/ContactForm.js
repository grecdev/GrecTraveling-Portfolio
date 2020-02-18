import React, { useContext } from 'react';

import RegexAlert from '../../global_layout/RegexAlert';

import { FormContext } from '../../../context/FormContext';

const ContactForm = () => {

	const {
		regexValidation,
		fullName_alert,
		email_alert,
		message_alert,
		submitForm
	} = useContext(FormContext);

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

				<form name='contact-us' className='p-3' onSubmit={submitForm}>
					<div className="form-box mb-2">
						<div>
							<input id='full-name' type="text" className='input-field' placeholder='Full Name' name='full-name' onBlur={regexValidation} onKeyDown={regexValidation} />
							{fullName_alert && <RegexAlert text='At least 3 characters required' />}
						</div>
						<div>
							<input id='email' className='email-input input-field' type="text" placeholder='Email Address' name='email' onBlur={regexValidation} onKeyDown={regexValidation} />
							{email_alert && <RegexAlert text='Invalid email address' />}
						</div>
					</div>

					<div className="form-box mb-2">
						<textarea placeholder='Message' className='input-field' id='message' name="message" id="message" cols="30" rows="10" onBlur={regexValidation} onKeyDown={regexValidation}></textarea>
						{message_alert && <RegexAlert text='At least 3 characters required' />}
					</div>

					<button className='btn btn-blue' type='submit'>Send Message</button>
				</form>
			</div>
		</section>
	)
}

export default ContactForm;
