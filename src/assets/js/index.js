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
import CheckinContextProvider from './context/checkin/CheckinContext';

import HomePage from './HomePage';
import ContactPage from './ContactPage';

const apps = {
	'index': <HomePage />,
	'contact-page': <ContactPage />
}

// I use this because, the website use multi html pages
const renderApp = el => {
	if (apps[el]) {
		ReactDOM.render(
			<GlobalContextProvider>
				<CheckinContextProvider>
					{apps[el]}
				</CheckinContextProvider>
			</GlobalContextProvider>
			, document.querySelector(`.${el}`));
	}
}

renderApp(document.body.id);

//// TEST
function test() {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open('GET', 'https://grecdev.github.io/json-api/hotels.json', true);

		xhr.onload = () => {

			const response = JSON.parse(xhr.responseText);

			if (xhr.status >= 400) reject(response);
			else resolve(response);

		};

		xhr.onerror = () => reject('something went wrong');

		xhr.send();
	});
}

test()
	.then(data => console.log(data))
	.catch(err => console.log(err));