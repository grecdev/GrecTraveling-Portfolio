import React from 'react';

import jump from 'jump.js';

const ResetScroll = () => {

	const goUp = e => {

		const target = e.target;
		const toggle = target.dataset.scrollToggle || target.parentElement.dataset.scrollToggle;

		if (e.currentTarget.tagName === 'DIV' && toggle === 'true') {

			jump(document.body, { duration: 500 });

			e.currentTarget.setAttribute('data-scroll-toggle', 'false');
			const currentTarget = e.currentTarget;

			setTimeout(() => currentTarget.setAttribute('data-scroll-toggle', 'true'), 1000);
		}

		e.stopPropagation();
	}

	return (
		<div id='reset-scroll' data-scroll-toggle='true' onClick={goUp}>
			<i className="fas fa-arrow-up"></i>
		</div>
	)
}

export default ResetScroll;
