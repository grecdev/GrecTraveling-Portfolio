'use strict';

/* 
	For development:
	1. SASS > CSS
	2. CSS > JS
	3. JS > DOM

	For production:
	1. SASS > CSS
	2. CSS > JS
	3. CSS > CSS.min and link in html file
*/

import '../css/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import GlobalContextProvider from './context/global/GlobalContext';

import HomePage from './HomePage';
import ContactPage from './ContactPage';

const apps = {
	'index': <HomePage />,
	'contact-page': <ContactPage />
}

const renderApp = el => {
	if (apps[el]) {
		ReactDOM.render(
			<GlobalContextProvider>
				{apps[el]}
			</GlobalContextProvider>
			, document.querySelector(`.${el}`));
	}
}

renderApp(document.body.id);