import React, { useEffect, useContext } from 'react';

import { SlideshowContext } from '@context/SlideshowContext';

const SlideshowButtons = () => {

	const { currentPos, changingTime, images, changeSlideshow, disableSelection } = useContext(SlideshowContext);

	const activeSlide = () => {

		document.querySelectorAll('.slideshow-btn').forEach((btn, index) => {
			index === currentPos ? btn.classList.add('slideshow-btn-active') : btn.classList.remove('slideshow-btn-active');
		});
	}

	useEffect(() => {

		activeSlide();

		const interval = setInterval(() => {

			activeSlide();

		}, changingTime);

		return () => clearInterval(interval);
	});

	const selectSlide = e => {

		if (e.target.tagName === 'BUTTON' && e.target.dataset.eventToggle === 'true') {
			changeSlideshow(parseFloat(e.target.id));

			disableSelection();
		}

		e.stopPropagation();
	}

	// Dynamically add buttons acording to how manny slides the user wants
	return (
		<div className='slideshow-buttons' onClick={selectSlide}>
			{images.map((img, index) => <button aria-label='select slideshow image' id={index} key={index} data-event-toggle='true' className='slideshow-btn my-1' type='button'></button>)}
		</div>
	)
}

export default SlideshowButtons;
