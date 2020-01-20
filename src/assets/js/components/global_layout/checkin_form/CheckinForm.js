import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';

import Calendar from './Calendar';
import PeopleSelection from './PeopleSelection';

const CheckinForm = ({ flights, hotels }) => {

	const {
		hotel_destination,
		flying_from,
		flying_to,
		checkIn_date,
		checkOut_date,
		peopleTotal,
		hotelCalendarCheckIn_visible,
		hotelCalendarCheckOut_visible,
		flightCalendarCheckIn_visible,
		flightCalendarCheckOut_visible,
		peopleSelection_visible,
		handleChange,
		displayForm,
		showCalendar,
		showPeopleSelection,
		filterSearch } = useContext(FormContext);

	return (
		<div className='form-container'>
			<div className="checkin-header" onClick={displayForm}>
				{flights && <a data-checkin-type='flights' className='active-form'>Flights</a>}
				{hotels && <a data-checkin-type='hotels'>Hotels</a>}
			</div>

			{flights && (
				<form name='flights' className='p-1 checkin-form display-flex' onSubmit={filterSearch}>

					<div className="form-box">
						<label htmlFor="flying_from">Flying from (optional):</label>
						<input type="text" id='flying_from' placeholder='Location' name='flying_from' onChange={handleChange} value={flying_from} />
					</div>

					<div className="form-box">
						<label htmlFor="flying_to">To (optional):</label>
						<input type="text" id='flying_to' placeholder='Location' name='flying_to' onChange={handleChange} value={flying_to} />
					</div>

					<div className="form-box">
						<label htmlFor="departing-checkin">Departing:</label>
						<input type="text" id='departing-checkin' placeholder='DD / MM / YY' name='departing-checkin' data-menu-toggle='on' onClick={showCalendar} value={checkIn_date} readOnly />

						{flightCalendarCheckIn_visible && <Calendar />}
					</div>

					<div className="form-box">
						<label htmlFor="returning-checkout">Returning:</label>
						<input type="text" id='returning-checkout' placeholder='DD / MM / YY' name='returning-checkout' data-menu-toggle='on' onClick={showCalendar} value={checkOut_date} readOnly />

						{flightCalendarCheckOut_visible && <Calendar />}
					</div>

					<div className="form-box">
						<label htmlFor="flight-passengers">Passengers:</label>
						<input type="text" id='flight-passengers' name='flight-passengers' data-menu-toggle='on' onClick={showPeopleSelection} value={peopleTotal} readOnly />

						{peopleSelection_visible && <PeopleSelection />}
					</div>

					<button><i className="fas fa-search"></i></button>
				</form>
			)}

			{hotels && (
				<form name='hotels' className='p-1 checkin-form display-none' onSubmit={filterSearch}>

					<div className="form-box">
						<label htmlFor="hotel_destination">City or Country (optional):</label>
						<input type="text" id='hotel_destination' placeholder='Enter a destination name' name='hotel_destination' onChange={handleChange} value={hotel_destination} />
					</div>

					<div className="form-box">
						<label htmlFor="hotel-checkin">Check-In:</label>
						<input type="text" id='hotel-checkin' placeholder='DD / MM / YY' name='hotel-checkin' data-menu-toggle='on' onClick={showCalendar} value={checkIn_date} readOnly />

						{hotelCalendarCheckIn_visible && <Calendar />}
					</div>

					<div className="form-box">
						<label htmlFor="hotel-checkout">Check-Out:</label>
						<input type="text" id='hotel-checkout' placeholder='DD / MM / YY' name='hotel-checkout' data-menu-toggle='on' onClick={showCalendar} value={checkOut_date} readOnly />

						{hotelCalendarCheckOut_visible && <Calendar />}
					</div>

					<div className="form-box">
						<label htmlFor="hotel-people">People:</label>
						<input type="text" id='hotel-people' name='hotel-people' data-menu-toggle='on' onClick={showPeopleSelection} value={peopleTotal} readOnly />

						{peopleSelection_visible && <PeopleSelection />}
					</div>

					<button><i className="fas fa-search"></i></button>
				</form>
			)}
		</div>
	)
}

CheckinForm.propTypes = {
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired
}

export default CheckinForm;
