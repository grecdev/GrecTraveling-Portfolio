import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormContext } from '../../context/FormContext';

import RoomCarouselSmall from './room/RoomCarouselSmall';
import RoomCarouselBig from './room/RoomCarouselBig';

const RoomPage = ({ match }) => {

	const { room } = match.params;

	const { hotels_db } = useContext(FormContext);

	const defaultCarouselState = {
		imageCount: 1,
		changeTime: 600,
		leftImage: undefined,
		rightImage: undefined,
		imageWidth: undefined
	}

	const [carouselState, setCarouselState] = useState(defaultCarouselState);

	const [carouselBigVisible, setCarouselBigVisible] = useState(false);

	const decrementImagePos = () => setCarouselState(carouselState => ({ ...carouselState, imageCount: carouselState.imageCount - 1 }));
	const incrementImagePos = () => setCarouselState(carouselState => ({ ...carouselState, imageCount: carouselState.imageCount + 1 }));
	const setImagePos = val => setCarouselState(carouselState => ({ ...carouselState, imageCount: val }));

	const setLeftImage = val => setCarouselState(carouselState => ({ ...carouselState, leftImage: val }));
	const setRightImage = val => setCarouselState(carouselState => ({ ...carouselState, rightImage: val }));

	const displayCarouselBig = e => {

		if (e.target.hasAttribute('data-zoom')) {

			setCarouselBigVisible(true);

			setTimeout(() => {

				let imagesArray = Array.from(document.querySelectorAll('.carousel-big-slider .slider-container .slider-image'));

				const imagesAvailable = imagesArray.length - 1;

				const imageMargin = parseFloat(window.getComputedStyle(document.querySelector('.carousel-big-slider .slider-container .slider-image')).getPropertyValue('margin-left')) * 2;

				const imageWidth = Math.round(document.querySelector('.carousel-big-slider .slider-container .slider-image').getBoundingClientRect().width + imageMargin);

				setCarouselState(carouselState => ({ ...carouselState, imageWidth: imageWidth }));

				imagesArray.forEach((image, index) => {

					image.style.transition = 'none';

					image.style.transform = `translateX(${imageWidth * (index - carouselState.imageCount)}px)`;

					let imagePos = Math.round(parseFloat(image.style.transform.match(/[\d-?]/g, '').join('')));

					if (imagePos < 0 && carouselState.imageCount !== 0) image.style.transform = `translateX(${-imageWidth}px)`;

					if (imagePos > 0 && carouselState.imageCount !== imagesAvailable) image.style.transform = `translateX(${imageWidth}px)`;

					// First image is centered
					if (carouselState.imageCount === 0 && index === imagesAvailable) image.style.transform = `translateX(${-imageWidth}px)`;

					// Last image is centered
					if (carouselState.imageCount === imagesAvailable && index === 0) image.style.transform = `translateX(${imageWidth}px)`;

					setTimeout(() => image.style.transition = '', 50);
				});

				document.querySelectorAll('.carousel-big-mini .mini-slider-image').forEach(image => {

					image.style.transition = 'none';

					setTimeout(() => image.style.transition = '', 50);
				});
			}, 1);
		}

		if (e.currentTarget.tagName === 'BUTTON') {

			setCarouselBigVisible(false);

			setTimeout(() => {

				document.querySelectorAll('#room-carousel-container .room-carousel-image').forEach(image => {

					image.style.transition = 'none';

					setTimeout(() => {

						image.style.transition = '';
					}, carouselState.changeTime);
				});
			}, 1);

			document.querySelectorAll('#room-carousel-wrapper [data-event-toggle]').forEach(element => {

				element.setAttribute('data-event-toggle', 'false');
				setTimeout(() => element.setAttribute('data-event-toggle', 'true'), carouselState.changeTime);
			});
		}

		e.stopPropagation();
	}

	const getRoom = () => {

		let obj = {};

		// Convert the url params to the hotel room initial name
		const defaultRoomName = room.replace(/-/g, ' ').split(' ').map(name => name.replace(name.charAt(0), name.charAt(0).toUpperCase())).join(' ');

		const roomItem = hotels_db.filter(hotle => hotle.roomName === defaultRoomName)[0];

		if (typeof roomItem === 'object') obj = roomItem;

		return obj;
	}

	const formatRoomReview = feedback => {

		let roomFeedback = [];
		const totalFeedback = 5;

		const filledStar = '<i class="fas fa-star" ></i >';
		const emptyStar = '<i class="far fa-star"></i>';

		for (let i = 0; i < feedback; i++) roomFeedback.push(filledStar);

		const remainingEmptyStars = totalFeedback - roomFeedback.length;

		for (let i = 1; i <= remainingEmptyStars; i++) roomFeedback.push(emptyStar);

		return roomFeedback.join(' ');
	}

	useEffect(() => {

		// Display the stars
		document.querySelectorAll('.room-feedback').forEach(element => {

			element.innerHTML = formatRoomReview(getRoom().roomFeedback);
		});

	}, [hotels_db]);

	useEffect(() => {

		// console.log(carouselState);

	}, [carouselState]);

	return (
		<>
			<main id='hotel-room'>
				<section id='room-showcase'>
					<div className="container p-2">

						<Link to='/hotels'><i className="fas fa-chevron-left"></i> back to hotels</Link>

						<div className="room-showcase-header">
							<div>
								<h1 className='heading'>{getRoom().roomName}</h1>

								<p className='room-feedback ml-1'></p>
							</div>

							<p>{getRoom().destination}</p>

						</div>
					</div>
				</section>

				<section id='room-preview'>
					<div className="container p-2 room-preview-wrapper">

						<RoomCarouselSmall
							room={getRoom()}
							carouselState={carouselState}
							decrementImagePos={decrementImagePos}
							incrementImagePos={incrementImagePos}
							displayCarouselBig={displayCarouselBig}
							setImagePos={setImagePos}
						/>

					</div>
				</section>
			</main>

			<RoomCarouselBig
				room={getRoom()}
				carouselState={carouselState}
				carouselBigVisible={carouselBigVisible}
				decrementImagePos={decrementImagePos}
				incrementImagePos={incrementImagePos}
				displayCarouselBig={displayCarouselBig}
				setImagePos={setImagePos}
				setLeftImage={setLeftImage}
				setRightImage={setRightImage}
			/>
		</>
	)
}

RoomPage.propTypes = {

	match: PropTypes.object.isRequired

}

export default RoomPage;
