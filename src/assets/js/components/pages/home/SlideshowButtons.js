import React, { useEffect, useContext } from 'react';

import { SlideshowContext } from '../../../context/slideshow/SlideshowContext';

const SlideshowButtons = () => {

	const { currentPos, changingTime } = useContext(SlideshowContext);

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

	return (
		<div className='slideshow-buttons'>
			<button className='slideshow-btn my-1' type='button'></button>
			<button className='slideshow-btn my-1' type='button'></button>
			<button className='slideshow-btn my-1' type='button'></button>
		</div>
	)
}

export default SlideshowButtons;
