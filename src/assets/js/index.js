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
import { HashRouter as Router } from 'react-router-dom';

import GlobalContextProvider from './context/GlobalContext';
const FormContextProvider = lazy(() => import('./context/FormContext'));
const App = lazy(() => import('./App'));


ReactDOM.render(
	<Router>
		<GlobalContextProvider>
			<Suspense fallback={<div></div>}>
				<FormContextProvider>
					<App />
				</FormContextProvider>
			</Suspense>
		</GlobalContextProvider >
	</Router >
	, document.getElementById('root'));