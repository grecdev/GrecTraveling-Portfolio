import React, { Component } from 'react';

import ContactForm from './contact/ContactForm';
import Faq from './contact/Faq';

class ContactPage extends Component {

	render() {
		return (
			<>
				<ContactForm />
				<Faq />
			</>
		)
	}
}

export default ContactPage;
