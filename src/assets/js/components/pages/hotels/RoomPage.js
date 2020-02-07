import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';
import { GlobalContext } from '../../../context/GlobalContext';

import RoomSlider from './RoomSlider';

const RoomPage = ({ match }) => {

	const { room } = match.params;

	const { getImage } = useContext(GlobalContext);

	const {
		hotels_db
	} = useContext(FormContext);

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

		document.querySelector('.room-feedback').innerHTML = formatRoomReview(getRoom().roomFeedback);

	}, [hotels_db]);

	return (
		<>
			<main id='hotel-room'>
				<section id='room-showcase'>
					<div className="container p-2">

						<Link to='/hotels'><i className="fas fa-chevron-left"></i> back to hotels</Link>

						<div className="room-showcase-header">
							<div>
								<h1 className='heading'>{getRoom().roomName}</h1>

								<p className='room-feedback ml-1'>{formatRoomReview(getRoom().roomFeedback)}</p>
							</div>

							<p>{getRoom().destination}</p>

						</div>
					</div>
				</section>

				<section id='room-preview'>
					<div className="container p-2 room-preview-wrapper">

						<RoomSlider room={getRoom()} />

					</div>
				</section>
			</main>
		</>
	)
}

RoomPage.propTypes = {

	match: PropTypes.object.isRequired

}

export default RoomPage;
