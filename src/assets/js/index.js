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
import { HashRouter } from 'react-router-dom';

import GlobalContextProvider from './context/GlobalContext';
const FormContextProvider = lazy(() => import('./context/FormContext'));
const App = lazy(() => import('./App'));

ReactDOM.render(
	<HashRouter>
		<GlobalContextProvider>
			<Suspense fallback={<div>Loading...</div>}>
				<FormContextProvider>
					<App />
				</FormContextProvider>
			</Suspense>
		</GlobalContextProvider>
	</HashRouter >
	, document.getElementById('root'));