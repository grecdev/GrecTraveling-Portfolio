import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalContext } from '../../../context/GlobalContext';

const SlideshowImage = () => {

	const { getImage } = useContext(GlobalContext);

	const images = ['amsterdam-showcase.jpg', 'paris-showcase.jpg', 'bali-showcase.jpg'];

	const moveSlides = (imagePos) => {
		const slideWidth = document.querySelector('.slideshow-image').getBoundingClientRect().width;

		document.querySelectorAll('.slideshow-image').forEach((slide, index) => {

			slide.style.transform = `translateX(${slideWidth * (index - imagePos)}px)`;

		});
	}

	useEffect(() => {

		let imagePos = 1;

		// So we have the initial position of each image
		moveSlides(imagePos);

		setInterval(() => {

			imagePos < 2 ? imagePos++ : imagePos = 0;

			moveSlides(imagePos);
		}, 3000);

	}, []);

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
