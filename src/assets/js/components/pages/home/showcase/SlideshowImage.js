import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../../../../context/GlobalContext';
import { SlideshowContext } from '../../../../context/SlideshowContext';

const SlideshowImage = () => {

	const { getImage } = useContext(GlobalContext);
	const { currentPos, changingTime, setPos, images, disableSelection } = useContext(SlideshowContext);

	const changeFormat = () => {

		Array.from(document.querySelectorAll('.slide picture source[type="image/webp"')).forEach(el => {

			const webpFormat = el.getAttribute('srcset').replace(/jpg/g, 'webp');

			el.setAttribute('srcset', webpFormat);
		});
	}

	changeFormat();

	const moveSlides = () => {

		const slideWidth = document.querySelector('.slideshow-image').getBoundingClientRect().width;

		document.querySelectorAll('.slideshow-image').forEach((slide, index) => {

			slide.style.transform = `translateX(${slideWidth * (index - currentPos)}px)`;

			// 1000 || -1000
			const slidePos = parseFloat(slide.style.transform.slice(11, -3));

			if (slidePos < 0) slide.style.transform = `translateX(${-slideWidth}px)`;
			if (slidePos > 0) slide.style.transform = `translateX(${slideWidth}px)`;

			if (slidePos < 0) slide.classList.add('outer-left');
			/** 
				z-index: -2 => Because the items in the slideshow array are displayed on top of each other
				So the solution is: the ones from the right are on top of the ones from the left, so when the image move to the left,
				the left one should be on the top of the right one.
			**/
			if (slidePos > 0) slide.classList.add('outer-right');

			if (slidePos === 0) slide.classList.remove('outer-left', 'outer-right');
		});

		disableSelection();
	}

	useEffect(() => {

		// So we have the initial position of each image
		moveSlides();

		const interval = setInterval(() => {

			setPos();
			moveSlides();

		}, changingTime);

		return () => clearInterval(interval);

	}, [currentPos]);

	return (
		images.map((img, index) => (
			<picture key={index + 1}>
				<source className='test' srcSet={getImage(img)} type='image/webp' />
				<source srcSet={getImage(img)} type='image/jpg' />

				<img src={getImage(img)} className='slideshow-image' alt={getImage(img)} />
			</picture>
		))
	)

}

export default SlideshowImage;
