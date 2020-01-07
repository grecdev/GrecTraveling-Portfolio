import React, { useContext } from 'react';

import { CheckinContext } from '../../../../context/checkin/CheckinContext';

const CheckinForm = () => {

	const { hotel_destination, hotel_checkIn, hotel_checkOut, hotel_people, handleChange, formatDates } = useContext(CheckinContext);

	const displayForm = e => {
		if (e.target.tagName === 'A') {
			const formType = e.target.dataset.checkinType;

			document.querySelectorAll('.checkin-form').forEach(form => form.classList.replace('display-flex', 'display-none'));
			document.getElementById(formType).classList.replace('display-none', 'display-flex');

			document.querySelectorAll('.active-checkin').forEach(btn => btn.classList.remove('active-checkin'));
			e.target.classList.add('active-checkin');
		}
	};

	return (
		<div id='checkin-form'>

			<div className="checkin-header" onClick={displayForm}>
				<a data-checkin-type='flights'>Flights</a>
				<a data-checkin-type='hotels' className='active-checkin'>Hotels</a>
			</div>

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
					<input type="text" id='departing' placeholder='MM / DD / YY' name='departing' />
				</div>

				<div className="form-box">
					<label htmlFor="returning">Returning:</label>
					<input type="text" id='returning' placeholder='MM / DD / YY' name='returning' />
				</div>

				<div className="form-box">
					<label htmlFor="passengers">Passengers:</label>
					<input type="text" id='passengers' value={1} readOnly name='passengers' />
				</div>

				<button type='submit'><i className="fas fa-search"></i></button>
			</form>

			<form name='hotels' id='hotels' className='p-1 checkin-form display-flex'>

				<div className="form-box">
					<label htmlFor="hotel_destination">City or Hotel name (optional):</label>
					<input type="text" id='hotel_destination' placeholder='Enter a destination or hotel name' name='hotel_destination' onChange={handleChange} value={hotel_destination} />
				</div>

				<div className="form-box">
					<label htmlFor="hotel_checkIn">Check-In:</label>
					<input type="text" id='hotel_checkIn' placeholder='DD / MM / YY' name='hotel_checkIn' onChange={formatDates} value={hotel_checkIn} />
				</div>

				<div className="form-box">
					<label htmlFor="hotel_checkOut">Check-Out:</label>
					<input type="text" id='hotel_checkOut' placeholder='DD / MM / YY' name='hotel_checkOut' onChange={handleChange} value={hotel_checkOut} readOnly />
				</div>

				<div className="form-box">
					<label htmlFor="hotel_people">People:</label>
					<input type="text" id='hotel_people' name='hotel_people' onChange={handleChange} value={hotel_people} />
				</div>

				<button type='submit'><i className="fas fa-search"></i></button>
			</form>
		</div>
	)
}

export default CheckinForm;
