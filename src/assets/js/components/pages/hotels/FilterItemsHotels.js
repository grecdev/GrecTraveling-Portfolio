import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '@context/GlobalContext';
import { FormContext } from '@context/FormContext';

const FilterItemsHotels = () => {

	const { getImage } = useContext(GlobalContext);
	const {
		appliedFiltered_hotels,
		peopleTotal,
		selectedDays } = useContext(FormContext);

	const [hotels, setHotels] = useState(null);

	const formatHotelReview = feedback => {

		let roomFeedback = [];
		let test = [];
		const totalFeedback = 5;

		const filledStar = '<i class="fas fa-star" ></i >';
		const emptyStar = '<i class="far fa-star"></i>';

		for (let i = 0; i < feedback; i++) roomFeedback.push(filledStar);

		const remainingEmptyStars = totalFeedback - roomFeedback.length;

		for (let i = 1; i <= remainingEmptyStars; i++) roomFeedback.push(emptyStar);

		return roomFeedback.join(' ');
	}

	useEffect(() => {

		setHotels(appliedFiltered_hotels.map(hotel => (
			<div className='filter-item-hotels' key={hotel.id}>

				<div className="hotel-image"><img src={getImage(hotel.image.roomShowcase)} alt='hotel image' /></div>

				<div className="hotel-item-content mx-3">

					<div className="hotel-item-header mb-1">
						<p className='hotel-review mb-1'></p>
						<p className='hotel-name heading'>{hotel.roomName} <span className="description">({hotel.destination})</span></p>
					</div>

					<div className="hotel-item-info">
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis eveniet exercitationem mollitia atque corporis laudantium quas nobis, facilis quod incidunt placeat sit optio earum quam quisquam sequi rerum accusantium voluptates unde, temporibus consectetur ullam. At soluta excepturi harum aut veniam?</p>
					</div>
				</div>

				<div className="hotel-item-price p-1 text-center">

					<div className="price-header mb-1">
						<p>Starts from:</p>
						<p>$ {hotel.price}</p>
					</div>

					<Link to={`/hotel-room/${hotel.roomName.toLowerCase().replace(/ /g, '-')}`} className='btn btn-pink'>Book Now</Link>

					<div className='price-info mt-1 text-center'>
						<p>Price for <span>{peopleTotal} {peopleTotal === 1 ? 'person' : 'persons'}</span></p>
						<p>for <span>{selectedDays} {selectedDays === 1 ? 'day' : 'days'}</span></p>
					</div>
				</div>

			</div>
		)));

		setTimeout(() => {

			// To have an array with stars
			const stars = appliedFiltered_hotels.map(hotel => formatHotelReview(hotel.roomFeedback));

			// Stars array will always be same as number of `.hotel-preview` DOM elements
			document.querySelectorAll('.hotel-review').forEach((review, index) => review.innerHTML = stars[index]);
		}, 1);

	}, [appliedFiltered_hotels]);

	return hotels;
}

export default FilterItemsHotels;
