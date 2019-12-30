import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '../../../context/global/GlobalContext';

const SlideshowImage = ({ startingImage, changingTime }) => {

	const { getImage } = useContext(GlobalContext);

	const images = ['amsterdam-showcase.jpg', 'paris-showcase.jpg', 'bali-showcase.jpg'];
	const [imagePos, setImagePos] = useState(startingImage);

	const moveSlides = () => {

		const slideWidth = document.querySelector('.slideshow-image').getBoundingClientRect().width;

		document.querySelectorAll('.slideshow-image').forEach((slide, index) => {

			slide.style.transform = `translateX(${slideWidth * (index - imagePos)}px)`;

			const slidePos = parseFloat(slide.style.transform.slice(11, -3));

			if (slidePos < 0) slide.style.transform = `translateX(${-slideWidth}px)`;
			if (slidePos > 0) slide.style.transform = `translateX(${slideWidth}px)`;

			if (slidePos < 0 || slidePos > 0) slide.classList.add('outer');
			if (slidePos === 0) slide.classList.remove('outer');
		});
	}

	useEffect(() => {

		// So we have the initial position of each image
		moveSlides();

		const interval = setInterval(() => {

			if (imagePos < 2) setImagePos(imagePos + 1);
			else setImagePos(0);

			moveSlides();

		}, changingTime);

		return () => clearInterval(interval);
	}, [imagePos]);

	return (

		images.map((img, index) => (
			<div
				style={{ background: `url(${getImage(img)}) no-repeat center/cover` }}
				key={index + 1}
				className='slideshow-image'
			>
			</div>
		))
	)
}

export default SlideshowImage;
