import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormContext } from '../../context/FormContext';

import RoomCarouselSmall from './room/RoomCarouselSmall';
import RoomCarouselBig from './room/RoomCarouselBig';

const RoomPage = ({ match }) => {

	const { room } = match.params;

	const {
		hotels_db,
		checkIn_date,
		checkOut_date,
		selectedDays
	} = useContext(FormContext);

	const defaultCarouselState = {
		imageCount: 1,
		changeTime: 600,
		imageWidth: 0,
		imagesAvailable: 0,
		imagesArray: []
	}

	const [carouselState, setCarouselState] = useState(defaultCarouselState);

	const [carouselBigVisible, setCarouselBigVisible] = useState(false);

	const decrementImagePos = () => setCarouselState(carouselState => ({ ...carouselState, imageCount: carouselState.imageCount - 1 }));
	const incrementImagePos = () => setCarouselState(carouselState => ({ ...carouselState, imageCount: carouselState.imageCount + 1 }));
	const setImagePos = val => setCarouselState(carouselState => ({ ...carouselState, imageCount: val }));

	const displayCarouselBig = e => {

		if (e.target.hasAttribute('data-zoom')) {

			setCarouselBigVisible(true);

			setTimeout(() => {

				let imagesArray = Array.from(document.querySelectorAll('.carousel-big-slider .slider-container .slider-image'));
				let imagesAvailable = imagesArray.length - 1;

				const imageMargin = parseFloat(window.getComputedStyle(document.querySelector('.carousel-big-slider .slider-container .slider-image')).getPropertyValue('margin-left')) * 2;

				const imageWidth = Math.round(document.querySelector('.carousel-big-slider .slider-container .slider-image').getBoundingClientRect().width + imageMargin);

				setCarouselState(carouselState => ({
					...carouselState,
					imageWidth: imageWidth,
					imagesAvailable: imagesAvailable,
					imagesArray: imagesArray
				}));

				imagesArray.forEach((image, index) => {

					image.style.transition = 'none';

					image.style.transform = `translateX(${imageWidth * (index - carouselState.imageCount)}px)`;

					let imagePos = Math.round(parseFloat(image.style.transform.match(/[\d-?]/g, '').join('')));

					if (imagePos < 0) image.style.transform = `translateX(${-imageWidth}px)`;
					if (imagePos > 0) image.style.transform = `translateX(${imageWidth}px)`;

					if (carouselState.imageCount === imagesAvailable && index === 0) image.style.transform = `translateX(${imageWidth}px)`;
					if (carouselState.imageCount === 0 && index === imagesAvailable) image.style.transform = `translateX(${-imageWidth}px)`;

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

					setTimeout(() => image.style.transition = '', carouselState.changeTime);
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
		document.querySelectorAll('.room-feedback').forEach(element => element.innerHTML = formatRoomReview(getRoom().roomFeedback));

	}, [hotels_db, carouselBigVisible]);

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

						<div className='p-1 text-center'>
							<h2 className='heading mb-1'>Booking Information</h2>

							<p className={getRoom().availability === 1 ? 'urgent my-1' : 'my-1'}>{getRoom().availability === 1 ? <i className="fas fa-fire"></i> : ''}Rooms available: <span>{getRoom().availability}</span></p>
							<p>Check-in: <span>{checkIn_date}</span> at <span>{getRoom().checkInHour}</span></p>
							<p>Check-out: <span>{checkOut_date}</span> at <span>{getRoom().checkOutHour}</span></p>
							<p>Room Price: <span>$ {getRoom().price}</span></p>
							<p>Reserved for: <span>{selectedDays}</span> {selectedDays === 1 ? 'day' : 'days'}</p>
						</div>
					</div>
				</section>

				<section id="room-information" className='mb-1'>
					<div className="container room-information-wrapper">

						<div className="room-information-box">

							<div className="room-information-category  text-center p-1">
								<h3>Description</h3>
							</div>

							<div className="room-information-content p-1">
								<p>{getRoom().details}</p>
							</div>

						</div>

						<div className="room-information-box">

							<div className="room-information-category  text-center p-1">
								<h3>Location services</h3>
							</div>

							<div className="room-information-content p-1">

								{
									getRoom().locationServices !== undefined && getRoom().locationServices.foodDrink.length > 0 ? (
										<>
											<div >
												<h4 className='heading mb-1'><i className="fas fa-utensils"></i> Food &amp; Drink</h4>

												<ul>
													{getRoom().locationServices.foodDrink.map((item, index) => <li key={index}>{item}</li>)}
												</ul>
											</div>
										</>
									) : null
								}

								{
									getRoom().locationServices !== undefined && getRoom().locationServices.transportation.length > 0 ? (
										<>
											<div >
												<h4 className='heading mb-1'><i className="fas fa-bus"></i> Transportation</h4>

												<ul>
													{getRoom().locationServices.transportation.map((item, index) => <li key={index}>{item}</li>)}
												</ul>
											</div>
										</>
									) : null
								}

								{
									getRoom().locationServices !== undefined && getRoom().locationServices.frontDesk_receptionAreaServices.length > 0 ? (
										<>
											<div >
												<h4 className='heading mb-1'><i className="fas fa-concierge-bell"></i> Front desk &amp; Area services</h4>

												<ul>
													{getRoom().locationServices.frontDesk_receptionAreaServices.map((item, index) => <li key={index}>{item}</li>)}
												</ul>
											</div>
										</>
									) : null
								}

							</div>

						</div>

						<div className="room-information-box">

							<div className="room-information-category  text-center p-1">
								<h3>Room services</h3>
							</div>

							<div className="room-information-content p-1">

								{
									getRoom().roomServices !== undefined && getRoom().roomServices.mediaTechnologies.length > 0 ? (
										<>
											<div >
												<h4 className='heading mb-1'><i className="fas fa-tv"></i> Media &amp; Technologies</h4>

												<ul>
													{getRoom().roomServices.mediaTechnologies.map((item, index) => <li key={index}>{item}</li>)}
												</ul>
											</div>
										</>
									) : null
								}

								{
									getRoom().roomServices !== undefined && getRoom().roomServices.foodsDrinks.length > 0 ? (
										<>
											<div >
												<h4 className='heading mb-1'><i className="fas fa-utensils"></i> Food &amp; Drink</h4>

												<ul>
													{getRoom().roomServices.foodsDrinks.map((item, index) => <li key={index}>{item}</li>)}
												</ul>
											</div>
										</>
									) : null
								}

								{
									getRoom().roomServices !== undefined && getRoom().roomServices.roomFacilties.length > 0 ? (
										<>
											<div >
												<h4 className='heading mb-1'><i className="fas fa-bed"></i> Room Facilities</h4>

												<ul>
													{getRoom().roomServices.roomFacilties.map((item, index) => <li key={index}>{item}</li>)}
												</ul>
											</div>
										</>
									) : null
								}

								{
									getRoom().roomServices !== undefined && getRoom().roomServices.servicesExtras.length > 0 ? (
										<>
											<div >
												<h4 className='heading mb-1'><i className="fas fa-plus"></i> Extra Services</h4>

												<ul>
													{getRoom().roomServices.servicesExtras.map((item, index) => <li key={index}>{item}</li>)}
												</ul>
											</div>
										</>
									) : null
								}

							</div>

						</div>

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
			/>
		</>
	)
}

RoomPage.propTypes = {

	match: PropTypes.object.isRequired

}

export default RoomPage;
