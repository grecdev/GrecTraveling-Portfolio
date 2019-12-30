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
import App from './App';

import GlobalContextProvider from './context/global/GlobalContext';

ReactDOM.render(
	<GlobalContextProvider>
		<App />
	</GlobalContextProvider>
	, document.getElementById('root'));
