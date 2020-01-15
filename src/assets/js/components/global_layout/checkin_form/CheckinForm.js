import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';

import Calendar from './Calendar';

const CheckinForm = ({ flights, hotels }) => {

	const {
		hotel_destination,
		hotel_checkIn,
		hotel_checkOut,
		people,
		calendarCheckIn_visible,
		calendarCheckOut_visible,
		handleChange,
		displayForm,
		showCalendar } = useContext(FormContext);

	return (
		<div className='form-container'>
			<div className="checkin-header" onClick={displayForm}>
				{flights && <a data-checkin-type='flights'>Flights</a>}
				{hotels && <a data-checkin-type='hotels' className='active-checkin'>Hotels</a>}
			</div>

			{flights && (
				<form name='flights' id='flights' className='p-1 checkin-form display-none'>

					<div className="form-box">
						<label htmlFor="from">Flying from:</label>
						<input type="text" id='from' placeholder='Location' name='flying-from' />
					</div>

					<div className="form-box">
						<label htmlFor="to">To:</label>
						<input type="text" id='to' placeholder='Location' name='flying-to' />
					</div>

					<div className="form-box">
						<label htmlFor="departing">Departing:</label>
						<input type="text" id='departing' placeholder='DD / MM / YY' name='departing' />
					</div>

					<div className="form-box">
						<label htmlFor="returning">Returning:</label>
						<input type="text" id='returning' placeholder='DD / MM / YY' name='returning' />
					</div>

					<div className="form-box">
						<label htmlFor="passengers">Passengers:</label>
						<input type="text" id='passengers' value={1} readOnly name='passengers' />
					</div>

					<button type='submit'><i className="fas fa-search"></i></button>
				</form>
			)}

			{hotels && (
				<form name='hotels' id='hotels' className='p-1 checkin-form display-flex'>

					<div className="form-box">
						<label htmlFor="hotel_destination">City or Hotel name (optional):</label>
						<input type="text" id='hotel_destination' placeholder='Enter a destination or hotel name' name='hotel_destination' onChange={handleChange} value={hotel_destination} />
					</div>

					<div className="form-box">
						<label htmlFor="hotel_checkIn">Check-In:</label>
						<input type="text" id='hotel_checkIn' placeholder='DD / MM / YY' name='hotel_checkIn' data-calendar-toggle='on' onClick={showCalendar} value={hotel_checkIn} readOnly />

						{calendarCheckIn_visible && <Calendar />}
					</div>

					<div className="form-box">
						<label htmlFor="hotel_checkOut">Check-Out:</label>
						<input type="text" id='hotel_checkOut' placeholder='DD / MM / YY' name='hotel_checkOut' data-calendar-toggle='on' onClick={showCalendar} value={hotel_checkOut} readOnly />

						{calendarCheckOut_visible && <Calendar />}
					</div>

					<div className="form-box">
						<label htmlFor="hotel_people">People:</label>
						<input type="text" id='hotel_people' name='hotel_people' onChange={handleChange} readOnly value={people} />
					</div>

					<button type='submit'><i className="fas fa-search"></i></button>
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
