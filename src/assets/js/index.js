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

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import GlobalContextProvider from './context/GlobalContext';
import FormContextProvider from './context/FormContext';

const HomePage = lazy(() => import('./HomePage'));
const ContactPage = lazy(() => import('./ContactPage'));

const apps = {
	'index': <HomePage />,
	'contact-page': <ContactPage />
};

// I use this because, the website use multi html pages
const renderApp = el => {
	if (apps[el]) {
		ReactDOM.render(
			<Suspense fallback={<div>Loading...</div>}>
				<GlobalContextProvider>
					<FormContextProvider>
						{apps[el]}
					</FormContextProvider>
				</GlobalContextProvider >
			</Suspense>
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