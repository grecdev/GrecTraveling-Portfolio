import React, { useEffect } from 'react';
import PropTypes from 'prop-types'

import Image from '@components/global_layout/Image';

const RoomCarouselSmall = (props) => {

	const {
		room,
		carouselState,
		decrementImagePos,
		incrementImagePos,
		displayCarouselBig,
		setImagePos
	} = props;

	const changeRoomImage = e => {

		const toggle = e.target.parentElement.dataset.eventToggle || e.target.dataset.eventToggle;

		if (e.currentTarget.tagName === 'BUTTON' && toggle === 'true') {

			if (e.currentTarget.id.includes('decrement')) {

				decrementImagePos();

				if (carouselState.imageCount === 1) {

					// So we don't zoom when the button disappears
					setTimeout(() => document.querySelector('[data-zoom]').removeAttribute('data-zoom'), 1);
					setTimeout(() => document.querySelector('.sliderSmall-image-center').setAttribute('data-zoom', ''), 800);
				}
			}

			if (e.currentTarget.id.includes('increment')) {

				incrementImagePos();

				if (carouselState.imageCount === 2) {

					// So we don't zoom when the button disappears
					setTimeout(() => document.querySelector('[data-zoom]').removeAttribute('data-zoom'), 1);
					setTimeout(() => document.querySelector('.sliderSmall-image-center').setAttribute('data-zoom', ''), 800);
				}
			}

			document.querySelectorAll('#room-carousel-wrapper [data-event-toggle]').forEach(element => {

				element.setAttribute('data-event-toggle', 'false');
				setTimeout(() => element.setAttribute('data-event-toggle', 'true'), carouselState.changeTime);
			});
		}

		if (e.target.classList.contains('carousel-mini-image') && toggle === 'true') {

			// Synthetic event problem
			const imagePos = parseFloat(e.target.dataset.imagePosition);

			setImagePos(imagePos);


			document.querySelectorAll('#room-carousel-wrapper [data-event-toggle]').forEach(element => {

				element.setAttribute('data-event-toggle', 'false');
				setTimeout(() => element.setAttribute('data-event-toggle', 'true'), carouselState.changeTime);
			});
		}

		e.stopPropagation();
	}

	const displayCarousel = () => {

		if (document.querySelectorAll('.room-carousel-image').length > 0) {

			document.querySelectorAll('.room-carousel-image').forEach((image, index) => {

				let imagePos;

				const imageMargins = parseFloat(window.getComputedStyle(image).getPropertyValue('margin-right')) * 2;

				const imageWidth = image.getBoundingClientRect().width + imageMargins;

				image.style.transform = `translateX(${imageWidth * (index - carouselState.imageCount)}px)`;

				imagePos = parseFloat(image.style.transform.slice(image.style.transform.indexOf('(') + 1, image.style.transform.indexOf('p')));

				if (imagePos < 0) {

					image.classList.remove('right-outer-image', 'full-image', 'sliderSmall-image-center');
					image.classList.add('left-outer-image');

				} else {

					image.classList.remove('left-outer-image', 'full-image', 'sliderSmall-image-center');
					image.classList.add('right-outer-image');
				}

				if (imagePos === 0) {

					image.classList.remove('left-outer-image', 'full-image', 'right-outer-image');
					image.classList.add('sliderSmall-image-center');
				}

				if (imagePos === 0 && (carouselState.imageCount === 0 || carouselState.imageCount === 3)) image.classList.add('full-image');

				if (carouselState.imageCount === 1 && image.classList.contains('left-outer-image')) {

					imagePos = parseFloat(image.nextElementSibling.style.transform.slice(image.nextElementSibling.style.transform.indexOf('(') + 1, image.nextElementSibling.style.transform.indexOf('p')));

					image.style.transform = `translateX(-${imagePos}px)`;
				}

				if (carouselState.imageCount === 2 && image.classList.contains('right-outer-image')) {

					imagePos = parseFloat(image.previousElementSibling.previousElementSibling.style.transform.slice(image.previousElementSibling.previousElementSibling.style.transform.indexOf('(') + 1, image.previousElementSibling.previousElementSibling.style.transform.indexOf('p')));

					image.style.transform = `translateX(${Math.abs(imagePos)}px)`;

				}

				if (image.classList.contains('sliderSmall-image-center')) image.setAttribute('data-zoom', '');
				else image.removeAttribute('data-zoom');
			});
		}
	}

	const displayMiniCarousel = () => {

		document.querySelectorAll('.carousel-mini-image').forEach((image, index) => {

			if (carouselState.imageCount === index) {

				image.classList.remove('disabled-image');
				image.classList.add('active-image');

			} else {

				image.classList.remove('active-image');
				image.classList.add('disabled-image');
			}
		});
	}

	useEffect(() => {

		displayCarousel();
		displayMiniCarousel();

	}, [room, carouselState.imageCount]);

	return (
		<div id="room-carousel-wrapper">
			<div id="room-carousel-container">
				{
					room.image !== undefined && room.image.roomReview.map((image, index) => (

						<div
							key={index + 1}
							style={{
								background: `url(${require(`../../../../media/${image}`)}) no-repeat center/cover`
							}}
							className='room-carousel-image'
							onClick={displayCarouselBig}
						>
						</div>

					))
				}

				<div id="room-carousel-buttons">
					<button type='button' id='decrement-room-image' className={carouselState.imageCount === 0 ? 'display-none' : ''} data-event-toggle='true' onClick={changeRoomImage}><i className="fas fa-chevron-left"></i></button>

					<button type='button' id='increment-room-image' className={carouselState.imageCount === 3 ? 'display-none' : ''} data-event-toggle='true' onClick={changeRoomImage}><i className="fas fa-chevron-right"></i></button>
				</div>

				<div id="room-carousel-counter" className='text-center'>
					<p>{carouselState.imageCount + 1} / {room.image !== undefined && room.image.roomReview.length}</p>
				</div>
			</div>

			<div id="room-carousel-mini">
				{
					room.image !== undefined && room.image.roomReview.map((image, index) => (

						<div
							key={index + 1}
							style={{
								background: `url(${require(`../../../../media/${image}`)}) no-repeat center/cover`
							}}
							className='carousel-mini-image'
							data-image-position={index}
							data-event-toggle='true'
							onClick={changeRoomImage}
						>
						</div>

					))
				}
			</div>
		</div >
	)
}

RoomCarouselSmall.propTypes = {
	room: PropTypes.object.isRequired,
	carouselState: PropTypes.object.isRequired,
	decrementImagePos: PropTypes.func.isRequired,
	incrementImagePos: PropTypes.func.isRequired,
	displayCarouselBig: PropTypes.func.isRequired,
	setImagePos: PropTypes.func.isRequired
}

export default RoomCarouselSmall
