import React, { Component } from 'react';

import Header from './components/global_layout/Header';
import ContactForm from './components/pages/contact/ContactForm';
import Faq from './components/pages/contact/Faq';

class ContactPage extends Component {
	render() {
		return (
			<>
				<Header />
				<ContactForm />
				<Faq />
			</>
		)
	}
}

export default ContactPage;
