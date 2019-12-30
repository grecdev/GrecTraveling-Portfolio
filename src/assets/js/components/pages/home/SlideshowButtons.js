import React, { useEffect, useState } from 'react';

const SlideshowButtons = ({ startingImage, changingTime }) => {

	const [activeBtn, setActiveBtn] = useState(startingImage);

	const activeSlide = () => {

		document.querySelectorAll('.slideshow-image').forEach((img, index) => {
			img.className === 'slideshow-image' ? activeBtn + index : false;
		});

		document.querySelectorAll('.slideshow-btn').forEach((btn, index) => {
			index === activeBtn ? btn.classList.add('slideshow-btn-active') : btn.classList.remove('slideshow-btn-active');
		});

	}

	useEffect(() => {

		activeSlide();

		const interval = setInterval(() => {

			if (activeBtn < 2) setActiveBtn(activeBtn + 1);
			else setActiveBtn(0);

			activeSlide();

		}, changingTime);

		return () => clearInterval(interval);
	}, [activeBtn]);

	return (
		<div className='slideshow-buttons'>
			<button className='slideshow-btn my-1' type='button'></button>
			<button className='slideshow-btn my-1' type='button'></button>
			<button className='slideshow-btn my-1' type='button'></button>
		</div>
	)
}

export default SlideshowButtons;
