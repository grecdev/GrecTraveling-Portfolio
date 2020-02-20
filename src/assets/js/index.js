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
import { HashRouter as Router } from 'react-router-dom';

import GlobalContextProvider from './context/GlobalContext';
import FormContextProvider from './context/FormContext';
import App from './App';

const FontFaceObserver = require('fontfaceobserver');

const domineObserver = new FontFaceObserver('Domine');
const robotoObserver = new FontFaceObserver('Roboto');

Promise.all([

	domineObserver.load(),
	robotoObserver.load()

]).then(() => document.documentElement.classList.add("fonts-loaded"));

ReactDOM.render(
	<Router>
		<GlobalContextProvider>
			<FormContextProvider>
				<App />
			</FormContextProvider>
		</GlobalContextProvider >
	</Router >
	, document.getElementById('root'));