import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';
import { GlobalContext } from '../../../context/GlobalContext';

const RoomSlider = ({ room }) => {

	const { getImage } = useContext(GlobalContext);

	useEffect(() => {

		if (document.querySelectorAll('.room-carousel-image').length > 0) {

			document.querySelectorAll('.room-carousel-image').forEach((image, index) => {

				const imageMargins = parseFloat(window.getComputedStyle(image).getPropertyValue('margin-right')) * 2;

				const imageWidth = image.getBoundingClientRect().width + imageMargins;

				image.style.transform = `translateX(${imageWidth * (index - 2)}px)`;

				const imagePos = parseFloat(image.style.transform.slice(image.style.transform.indexOf('(') + 1, image.style.transform.indexOf('p')));

				if (imagePos !== 0) image.classList.add('outer-image');
			});
		}

	}, [room]);

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
				<button type='button' id='left-room-image'><i className="fas fa-chevron-left"></i></button>

				<button type='button' id='right-room-image'><i className="fas fa-chevron-right"></i></button>
			</div>
		</div>
	)
}

RoomSlider.propTypes = {

	room: PropTypes.object.isRequired

}

export default RoomSlider
