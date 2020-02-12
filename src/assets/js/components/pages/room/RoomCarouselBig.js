import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';
import { GlobalContext } from '../../../context/GlobalContext';

const RoomCarouselBig = (props) => {

	const {
		peopleTotal,
		selectedDays
	} = useContext(FormContext);

	const { getImage } = useContext(GlobalContext);

	const {
		room,
		carouselState,
		carouselBigVisible,
		decrementImagePos,
		incrementImagePos,
		displayCarouselBig,
		setImagePos,
		setLeftImage,
		setRightImage
	} = props;

	const displayMiniCarousel = () => {

		document.querySelectorAll('.mini-slider-image').forEach((image, index) => {

			if (carouselState.imageCount === index) {

				image.classList.remove('disabled-image');
				image.classList.add('active-image');

			} else {

				image.classList.remove('active-image');
				image.classList.add('disabled-image');
			}
		});
	};

	const changeSlideImage = e => {

		const toggle = e.target.parentElement.dataset.eventToggle || e.target.dataset.eventToggle;

		let imagesAvailable = document.querySelectorAll('.carousel-big-slider .slider-container .slider-image').length - 1;
		let imagesArray = Array.from(document.querySelectorAll('.carousel-big-slider .slider-container .slider-image'));

		let currentImage = carouselState.imageCount + 1;
		let prevImage = carouselState.imageCount;

		if (e.type === 'click') {

			if (e.currentTarget.tagName === 'BUTTON' && toggle === 'true') {

				if (e.currentTarget.id.includes('decrement')) {

					decrementImagePos();

					if (carouselState.imageCount - 1 === -1) setImagePos(3);
				}

				if (e.currentTarget.id.includes('increment')) {

					incrementImagePos();

					if (carouselState.imageCount === 3) {

						setImagePos(0);
						currentImage = 0;
					}

					imagesArray[currentImage].style.transform = `translateX(${0}px)`;

					imagesArray.forEach(image => {

						let imagePos = Math.round(parseFloat(image.style.transform.match(/[\d-?]/g, '').join('')));

						if (imagePos < 0) image.style.transform = `translateX(${carouselState.imageWidth}px)`;

					});

					imagesArray[prevImage].style.transform = `translateX(${-carouselState.imageWidth}px)`;
				}
			}

			if (e.target.classList.contains('mini-slider-image') && toggle === 'true') {

				console.log('=====');

				let count = parseFloat(e.target.dataset.imagePosition);

				setImagePos(count);

				imagesArray[count].style.transform = `translateX(${0}px)`;

				imagesArray.forEach((image, index) => {

					let imagePos = Math.round(parseFloat(image.style.transform.match(/[\d-?]/g, '').join('')));

					if (count > carouselState.imageCount) {

						if (count > index && imagePos < 0) {

							image.style.transform = `translateX(${carouselState.imageWidth}px)`;
						}

						if (carouselState.imageCount === index) {

							if (imagePos === 0) image.style.transform = `translateX(${-carouselState.imageWidth}px)`;
						}

					}
				});
			}

			toggle === 'true' && document.querySelectorAll('#room-carousel-big [data-event-toggle]').forEach(element => {

				element.setAttribute('data-event-toggle', 'false');
				setTimeout(() => element.setAttribute('data-event-toggle', 'true'), carouselState.changeTime);
			});
		}

		if (e.type === 'mouseover') {

			if (e.currentTarget.id.includes('increment')) {

				imagesArray.forEach((image, index) => {

					let imagePos = Math.round(parseFloat(image.style.transform.match(/[\d-?]/g, '').join('')));

					// If first image is on the left outer side
					if (index === 0 && imagePos < 0) {

						image.style.transition = 'none';

						image.style.transform = `translateX(${carouselState.imageWidth}px)`;

						setTimeout(() => image.style.transition = '', 10);

					}

				});

			}

			if (e.target.classList.contains('mini-slider-image')) {

				let count = parseFloat(e.target.dataset.imagePosition);

				imagesArray.forEach((image, index) => {

					let imagePos = Math.round(parseFloat(image.style.transform.match(/[\d-?]/g, '').join('')));

					// If last image is on the left outer side
					if (index === imagesAvailable && imagePos < 0) {

						image.style.transition = 'none';

						image.style.transform = `translateX(${carouselState.imageWidth}px)`;

						setTimeout(() => image.style.transition = '', 10);
					}

				});

			}
		}

		e.stopPropagation();
	}

	useEffect(() => {

		carouselBigVisible && displayMiniCarousel();

	}, [carouselBigVisible, carouselState.imageCount]);

	return carouselBigVisible && (
		<div id="room-carousel-big">
			<div className="container carousel-big-container">

				<div className="carousel-big-header p-3">

					<div className="room-showcase-header">
						<div>
							<h1 className='heading'>{room.roomName}</h1>

							<p className='room-feedback ml-1'></p>
						</div>

						<p>{room.destination}</p>

					</div>

					<div className="room-info">
						<div>
							<p><span>$</span>{room.price * peopleTotal}</p>
							<p>Price for <span>{peopleTotal} {peopleTotal === 1 ? 'person' : 'persons'}</span> for <span>{selectedDays} {selectedDays === 1 ? 'day' : 'days'}</span></p>
						</div>

						<button type='button' onClick={displayCarouselBig}><i className="far fa-times-circle"></i></button>
					</div>
				</div>

				<div className="carousel-big-wrapper pb-1">
					<div className="carousel-big-slider">

						<div className="slider-container">
							{
								room.image !== undefined && room.image.roomReview.map((image, index) => (
									<div
										className='slider-image'
										key={index + 1}
										style={{
											background: `url(${getImage(image)}) no-repeat center / cover`
										}}
									>
									</div>
								))
							}
						</div>

						<div id="carousel-big-buttons">
							<button type='button' id='decrement-carouselBig-image' data-event-toggle='true' onMouseOver={changeSlideImage} onClick={changeSlideImage}><i className="fas fa-arrow-alt-circle-left"></i></button>

							<button type='button' id='increment-carouselBig-image' data-event-toggle='true' onMouseOver={changeSlideImage} onClick={changeSlideImage}><i className="fas fa-arrow-alt-circle-right"></i></button>
						</div>

					</div>

					<div className="carousel-big-mini">
						{
							room.image !== undefined && room.image.roomReview.map((image, index) => (
								<div
									className='mini-slider-image'
									style={{
										background: `url(${getImage(image)}) no-repeat center / cover`
									}}
									key={index + 1}
									data-image-position={index}
									data-event-toggle='true'
									onClick={changeSlideImage}
									onMouseOver={changeSlideImage}
								>
								</div>
							))
						}
					</div>

				</div>

			</div>
		</div>
	)
}

RoomCarouselBig.propTypes = {
	room: PropTypes.object.isRequired,
	carouselState: PropTypes.object.isRequired,
	decrementImagePos: PropTypes.func.isRequired,
	incrementImagePos: PropTypes.func.isRequired,
	displayCarouselBig: PropTypes.func.isRequired,
	setImagePos: PropTypes.func.isRequired,
	carouselBigVisible: PropTypes.bool.isRequired,
	setLeftImage: PropTypes.func.isRequired,
	setRightImage: PropTypes.func.isRequired
}

export default RoomCarouselBig;
