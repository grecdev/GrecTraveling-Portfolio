import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../../context/FormContext';
import { GlobalContext } from '../../../context/GlobalContext';

const FilterItemsFlights = () => {

	const {
		appliedFiltered_flights,
		checkIn_day,
		checkIn_month,
		checkIn_year,
		peopleTotal,
		monthAbbr,
		monthName,
		weekdayName,
		flying_to } = useContext(FormContext);

	const { getImage } = useContext(GlobalContext);

	const [flights, setFlights] = useState(null);

	const formatWeekDay = () => {

		let day = new Date(`${monthName[checkIn_month]} ${checkIn_day}, ${checkIn_year}`).getDay() - 1;

		day === -1 ? day = 6 : day;

		return weekdayName[day];
	};

	const formatTime = (hour, minutes) => {

		let formatedHour, formatedMinutes, formatTime;

		formatedHour = hour < 10 ? '0' + hour : hour;
		formatedMinutes = minutes < 10 ? '0' + minutes : minutes;

		formatTime = `${formatedHour}:${formatedMinutes}`;

		return formatTime;
	}

	const formatIntervalTime = (departureHour, departureMinutes, landingHour, landingMinutes) => {

		let intervalHours, intervalMinutes;

		intervalHours = Math.abs(landingHour - departureHour);
		intervalMinutes = Math.abs(landingMinutes - departureMinutes);

		return `${intervalHours}h ${intervalMinutes < 10 ? '0' + intervalMinutes : intervalMinutes}min`;
	}

	const formatLandingDestination = () => flying_to.slice(0, 3).toUpperCase();

	// I do this, so it displays the flights when i change the "DB"
	// Without `useEffect hook`, it displays whenever some component renders
	useEffect(() => {

		setFlights(appliedFiltered_flights.map((item) => (
			<div className='filter-item-flights' key={item.id}>

				<div>
					<div className="filter-item-header mb-1">

						<div className="flight-locations">
							<div className="airline-logo mr-1"><img src={getImage(item.airlinesLogo)} alt='airlines company' /></div>
							<span>{item.abbr}</span>
							<div className='mx-1'></div>
							<span className='mr-1'>{formatLandingDestination()}</span>
							<span title='Departure day'>{checkIn_day} {monthAbbr[checkIn_month]} ({formatWeekDay()})</span>
						</div>

						<div className="flight-type text-right">
							<p className="flight-stops">{item.stops > 1 ? `${item.stops} stops` : `${item.stops} stop`}</p>
							<p className="flight-class">class: {item.class}</p>
						</div>

					</div>

					<div className="flight-item-interval">
						<span>{formatTime(item.departureHour, item.departureMinutes)}</span>
						<div className="mx-1"><img src={getImage('flight-arrow.svg')} alt='flight-arrow' /></div>
						<span className='mr-1'>{formatTime(item.landingHour, item.landingMinutes)}</span>
						<span title='Trip Duration'><i className="far fa-clock"></i> {formatIntervalTime(item.departureHour, item.departureMinutes, item.landingHour, item.landingMinutes)}</span>
					</div>
				</div>

				<div className="flight-item-price py-1">
					<p className='price'><span>$</span> {item.price * peopleTotal}</p>
					<p className='my-1'>Price for {peopleTotal > 1 ? `${peopleTotal} passengers` : `${peopleTotal} passenger`}</p>

					<button className='btn btn-pink' type='button'>Buy Ticket</button>
				</div>
			</div>
		)));

	}, [appliedFiltered_flights]);

	return flights;
}

export default FilterItemsFlights;
