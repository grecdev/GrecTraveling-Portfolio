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
		setImagePos
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

		let incrementCount = carouselState.imageCount + 1;
		let decrementCount = carouselState.imageCount - 1;

		const imagePosition = parseFloat(e.target.dataset.imagePosition);

		function move(target) {

			carouselState.imagesArray.forEach((image, index) => {

				let imagePos = Math.round(parseFloat(image.style.transform.match(/[\d-?]/g, '').join('')));

				if (target.id.includes('decrement')) {

					// Move to the right side the image in the center position
					if (index === carouselState.imageCount) image.style.transform = `translateX(${carouselState.imageWidth}px)`;

					// Move to center the following image
					if (index === decrementCount) image.style.transform = `translateX(${0}px)`;

					// If the following image is the last one
					if (decrementCount === carouselState.imagesAvailable) {

						// Move the images to the left position
						if (index < decrementCount && index !== carouselState.imageCount) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}

						// Move the first image on the right side so we have an 'infinite slider'
						if (index === 0) {

							image.style.transform = `translateX(${carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}

						// Move the last image to the left side and then move it to center
						if (index === carouselState.imagesAvailable) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

							setTimeout(() => {

								image.style.transition = '';
								image.style.transform = `translateX(${0}px)`;

							}, 1);
						}

						// If following image is not the last image
					} else {

						// Index higher than the center image, move to the left side
						if (decrementCount > index && imagePos > 0) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}
					}
				}

				if (target.id.includes('increment')) {

					// Move to the left side the image in the center position
					if (index === carouselState.imageCount) image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

					// Move to center the following image
					if (index === incrementCount) image.style.transform = `translateX(${0}px)`;

					// If the following image is the last one
					if (incrementCount === carouselState.imagesAvailable) {

						// Move the images to the left position
						if (index < incrementCount && index !== carouselState.imageCount) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}

						// Move the first image on the right side so we have an 'infinite slider'
						if (index === 0) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}

						// Move the last image to the right side and then move it to center
						if (index === carouselState.imagesAvailable) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${carouselState.imageWidth}px)`;

							setTimeout(() => {

								image.style.transition = '';
								image.style.transform = `translateX(${0}px)`;

							}, 1);
						}

						// If following image is not the last image
					} else {

						// Index higher than the center image, move to the right side
						if (imagePosition < index && imagePos < 0) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}

						// Index lower than the center image, move to the left side
						if (imagePosition > index && imagePos > 0) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}
					}

					// If the following image is the first one
					if (incrementCount === 0) {

						// Move the images to the right position
						if (index > incrementCount && index !== carouselState.imageCount) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${carouselState.imageWidth}px)`;

							setTimeout(() => image.style.transition = '', 1);
						}

						if (index === carouselState.imagesAvailable) {

							image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

							// And than move it to the right side so we have an 'infinite slider'
							setTimeout(() => {

								image.style.transition = 'none';
								image.style.transform = `translateX(${carouselState.imageWidth}px)`;

								setTimeout(() => image.style.transition = '', 100);

							}, carouselState.changeTime);
						}

						// Move the first image to the right side and then move it to center
						if (index === 0) {

							image.style.transition = 'none';
							image.style.transform = `translateX(${carouselState.imageWidth}px)`;

							setTimeout(() => {

								image.style.transition = '';
								image.style.transform = `translateX(${0}px)`;

							}, 1);
						}
					}
				}

				if (target.classList.contains('mini-slider-image')) {

					// Move images to the left side
					if (imagePosition > carouselState.imageCount) {

						// Move to the left side the image in the center position
						if (index === carouselState.imageCount) image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

						// Move to center the clicked image
						if (index === imagePosition) image.style.transform = `translateX(${0}px)`;

						// If we click on the last image
						if (imagePosition === carouselState.imagesAvailable) {

							// Move the images to the left position
							if (index < imagePosition && index !== carouselState.imageCount) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

								setTimeout(() => image.style.transition = '', 1);
							}

							// Move the first image on the left side
							if (index === 0) {

								image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

								// And than move it to the right side so we have an 'infinite slider'
								setTimeout(() => {

									image.style.transition = 'none';
									image.style.transform = `translateX(${carouselState.imageWidth}px)`;


									setTimeout(() => image.style.transition = '', 100);

								}, carouselState.changeTime);
							}

							// Move the last image to the right side and then move it to center
							if (index === carouselState.imagesAvailable) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${carouselState.imageWidth}px)`;

								setTimeout(() => {

									image.style.transition = '';
									image.style.transform = `translateX(${0}px)`;

								}, 1);
							}

							// If we don't click on the last image
						} else {

							// Index higher than the center image, move to the right side
							if (imagePosition < index && imagePos < 0) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${carouselState.imageWidth}px)`;

								setTimeout(() => image.style.transition = '', 1);
							}

							// Index lower than the center image, move to the left side
							if (imagePosition > index && imagePos > 0) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

								setTimeout(() => image.style.transition = '', 1);
							}
						}
					}

					// Move images to the right side
					if (imagePosition < carouselState.imageCount) {

						// Move to center the clicked image
						if (index === imagePosition) image.style.transform = `translateX(${0}px)`;

						// Move to the right side position the image on the center position
						if (index === carouselState.imageCount) image.style.transform = `translateX(${carouselState.imageWidth}px)`;

						// If we click on the first image
						if (imagePosition === 0) {

							// Move the images to the right position
							if (index > imagePosition && index !== carouselState.imageCount) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${carouselState.imageWidth}px)`;

								setTimeout(() => image.style.transition = '', 1);
							}

							// Move the last image on the right side
							if (index === carouselState.imagesAvailable) {

								image.style.transform = `translateX(${carouselState.imageWidth}px)`;

								// And than move it to the left side so we have an 'infinite slider'
								setTimeout(() => {

									image.style.transition = 'none';
									image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

									setTimeout(() => image.style.transition = '', 100);

								}, carouselState.changeTime);
							}

							// Move the first image to the left side and then move it to center
							if (index === 0) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

								setTimeout(() => {

									image.style.transition = '';
									image.style.transform = `translateX(${0}px)`;

								}, 1);
							}

							// If we don't click on the first image
						} else {

							// Index lower than the center image, move to the left side
							if (imagePosition > index && imagePos > 0) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${-carouselState.imageWidth}px)`;

								setTimeout(() => image.style.transition = '', 1);
							}

							// Index higher than the center image, move to the right side
							if (imagePosition < index && imagePos < 0) {

								image.style.transition = 'none';
								image.style.transform = `translateX(${carouselState.imageWidth}px)`;

								setTimeout(() => image.style.transition = '', 1);
							}
						}
					}
				}
			});
		}

		if (e.type === 'click') {

			if (e.currentTarget.tagName === 'BUTTON' && toggle === 'true') {

				if (e.currentTarget.id.includes('decrement')) {

					decrementImagePos();

					if (carouselState.imageCount - 1 === -1) {

						setImagePos(3);
						decrementCount = 3;
					}

					move(e.currentTarget);
				}

				if (e.currentTarget.id.includes('increment')) {

					incrementImagePos();

					if (carouselState.imageCount === 3) {

						setImagePos(0);
						incrementCount = 0;
					}

					move(e.currentTarget);
				}
			}

			if (e.target.classList.contains('mini-slider-image') && toggle === 'true') {

				setImagePos(imagePosition);

				move(e.target);
			}

			toggle === 'true' && document.querySelectorAll('#room-carousel-big [data-event-toggle]').forEach(element => {

				element.setAttribute('data-event-toggle', 'false');
				setTimeout(() => element.setAttribute('data-event-toggle', 'true'), carouselState.changeTime);
			});
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
										key={index}
										style={{
											background: `url(${getImage(image)}) no-repeat center / cover`
										}}
									>
									</div>
								))
							}

						</div>

						<div id="carousel-big-buttons">
							<button
								type='button'
								id='decrement-carouselBig-image'
								data-event-toggle='true'
								onClick={changeSlideImage}>
								<i className="fas fa-arrow-alt-circle-left"></i>
							</button>

							<button
								type='button'
								id='increment-carouselBig-image'
								data-event-toggle='true'
								onClick={changeSlideImage}>
								<i className="fas fa-arrow-alt-circle-right"></i>
							</button>
						</div>

						<div className="photo-count text-center">
							<p>{carouselState.imageCount + 1} / {room.image !== undefined && room.image.roomReview.length}</p>
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
	displayCarouselBig: PropTypes.func.isRequired,
	setImagePos: PropTypes.func.isRequired,
	carouselBigVisible: PropTypes.bool.isRequired
}

export default RoomCarouselBig;
