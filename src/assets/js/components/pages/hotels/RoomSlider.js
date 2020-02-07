import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';
import { GlobalContext } from '../../../context/GlobalContext';

const RoomSlider = ({ room }) => {

	const { getImage } = useContext(GlobalContext);

	const defaultCarouselState = {
		imagePos: 2,
	}

	const [carouselState, setCarouselState] = useState(defaultCarouselState);

	const changeRoomImage = e => {

		if (e.currentTarget.tagName === 'BUTTON') {

			if (e.currentTarget.id.includes('decrement')) {

				setCarouselState(carouselState => ({ ...carouselState, imagePos: carouselState.imagePos - 1 }));

				e.currentTarget.nextElementSibling.classList.remove('display-none');
				carouselState.imagePos === 1 && e.currentTarget.classList.add('display-none');

				if (document.body.contains(document.querySelector('.full-image'))) {

					document.querySelector('.full-image').classList.add('reseted-right-image');
					setTimeout(() => document.querySelector('.reseted-right-image').classList.remove('reseted-right-image'), 100);
				}
			}

			if (e.currentTarget.id.includes('increment')) {

				setCarouselState(carouselState => ({ ...carouselState, imagePos: carouselState.imagePos + 1 }));

				e.currentTarget.previousElementSibling.classList.remove('display-none');
				carouselState.imagePos === 2 && e.currentTarget.classList.add('display-none');

				if (document.body.contains(document.querySelector('.full-image'))) {

					document.querySelector('.full-image').classList.add('reseted-left-image');
					setTimeout(() => document.querySelector('.reseted-left-image').classList.remove('reseted-left-image'), 100);
				}
			}
		}

		e.stopPropagation();
	}

	const displayCarousel = () => {

		if (document.querySelectorAll('.room-carousel-image').length > 0) {

			document.querySelectorAll('.room-carousel-image').forEach((image, index) => {

				let imagePos;

				const imageMargins = parseFloat(window.getComputedStyle(image).getPropertyValue('margin-right')) * 2;

				const imageWidth = image.getBoundingClientRect().width + imageMargins;

				image.style.transform = `translateX(${imageWidth * (index - carouselState.imagePos)}px)`;

				imagePos = parseFloat(image.style.transform.slice(image.style.transform.indexOf('(') + 1, image.style.transform.indexOf('p')));

				if (imagePos !== 0) {

					image.classList.remove('center-image', 'full-image');
					image.classList.add('outer-image');
				}
				else {

					image.classList.remove('outer-image');
					image.classList.add('center-image');
				}

				if (imagePos === 0 && (carouselState.imagePos === 0 || carouselState.imagePos === 3)) image.classList.add('full-image');

				if (image.classList.contains('reseted-left-image')) {

					imagePos = parseFloat(image.nextElementSibling.style.transform.slice(image.nextElementSibling.style.transform.indexOf('(') + 1, image.nextElementSibling.style.transform.indexOf('p')));

					image.style.transform = `translateX(-${imagePos}px)`;
				}

				if (image.classList.contains('reseted-right-image')) {

					imagePos = parseFloat(image.previousElementSibling.previousElementSibling.style.transform.slice(image.previousElementSibling.previousElementSibling.style.transform.indexOf('(') + 1, image.previousElementSibling.previousElementSibling.style.transform.indexOf('p')));

					image.style.transform = `translateX(${Math.abs(imagePos)}px)`;
				}
			});
		}
	}

	useEffect(() => {

		displayCarousel();

	}, [room, carouselState]);

	return (
		<div id="room-carousel">
			{
				room.image !== undefined && room.image.roomReview.map((image, index) => (

					<div
						key={index + 1}
						style={{
							background: `url(${getImage(image)}) no-repeat center/cover`
						}}
						className='room-carousel-image'
					>
					</div>

				))
			}

			<div id="room-carousel-buttons">
				<button onClick={changeRoomImage} type='button' id='decrement-room-image'><i className="fas fa-chevron-left"></i></button>

				<button onClick={changeRoomImage} type='button' id='increment-room-image'><i className="fas fa-chevron-right"></i></button>
			</div>
		</div>
	)
}

RoomSlider.propTypes = {

	room: PropTypes.object.isRequired

}

export default RoomSlider
