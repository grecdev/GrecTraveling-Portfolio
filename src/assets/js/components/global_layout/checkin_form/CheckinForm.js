import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';
import { GlobalContext } from '../../../context/GlobalContext';

import RegexAlert from '../RegexAlert';

import Calendar from './Calendar';
import PeopleSelection from './PeopleSelection';
import SearchTip from './SearchTip';

const CheckinForm = ({ flights, hotels, multiple }) => {

	const {
		flying_from,
		flying_to,
		hotel_destination,
		checkIn_date,
		checkOut_date,
		peopleTotal,
		flightsForm_visible,
		hotelsForm_visible,
		flightCalendarCheckIn_visible,
		flightCalendarCheckOut_visible,
		hotelCalendarCheckIn_visible,
		hotelCalendarCheckOut_visible,
		peopleSelectionFlights_visible,
		peopleSelectionHotels_visible,
		handleChange,
		displayForm,
		showCalendar,
		showPeopleSelection,
		submitForm,
		regexValidation,
		flightsMultiple_alert,
		hotelsMultiple_alert,
		flyingTo_alert,
		hotelDestination_alert
	} = useContext(FormContext);

	const { location } = useContext(GlobalContext);

	return (
		<div className={!hotels || location !== '/hotels' ? 'form-container' : 'form-container hotels'}>
			{multiple && (
				<div className="checkin-header" onClick={displayForm}>
					<a data-checkin-type='flights' className={flightsForm_visible ? 'active-form' : ''}>Flights</a>
					<a data-checkin-type='hotels' className={hotelsForm_visible ? 'active-form' : ''}>Hotels</a>
				</div>
			)}

			{flights ? (
				<form name='flights' className={flightsForm_visible ? 'p-1 checkin-form' : 'p-1 checkin-form display-none'} onSubmit={submitForm} onKeyDown={submitForm}>

					<div className="form-box">
						<label htmlFor="flying_from">Flying from:</label>
						<input type="text" id='flying_from' className='input-correct disabled-input' placeholder='Location' name='flying_from' onChange={handleChange} value={flying_from} />
					</div>

					<div className="form-box">
						<label htmlFor="flying_to">To:</label>
						<input type="text" id='flying_to' placeholder='Location' name='flying_to' onBlur={regexValidation} onKeyDown={regexValidation} onChange={handleChange} value={flying_to} />

						{flyingTo_alert && <RegexAlert text='At least 3 characters required' />}
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
						<input type="text" id='flight-passengers' className={peopleTotal > 0 ? 'input-correct' : 'wrong-validation'} name='flight-passengers' onClick={showPeopleSelection} data-menu-toggle='on' value={peopleTotal} readOnly />

						{peopleSelectionFlights_visible && <PeopleSelection />}
					</div>

					<button type='submit'><i className="fas fa-search"></i></button>

					{flightsMultiple_alert && <RegexAlert text='All input fields are required' />}

					{location === '/' && <SearchTip />}
				</form>
			) : null}

			{hotels ? (
				<form name='hotels' className={hotelsForm_visible ? 'p-1 checkin-form' : 'p-1 checkin-form display-none'} onSubmit={submitForm}>

					<div className="form-box">
						<label htmlFor="hotel_destination">City or Country:</label>
						<input type="text" id='hotel_destination' className='input-correct disabled-input' placeholder='Enter a destination' name='hotel_destination' onChange={handleChange} value={hotel_destination} />

						{hotelDestination_alert && <RegexAlert text='At least 3 characters required' />}
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
						<input type="text" id='hotel-people' name='hotel-people' data-menu-toggle='on' className={peopleTotal > 0 ? 'input-correct' : 'wrong-validation'} onClick={showPeopleSelection} value={peopleTotal} readOnly />

						{peopleSelectionHotels_visible && <PeopleSelection />}
					</div>

					<button type='submit'><i className="fas fa-search"></i></button>

					{hotelsMultiple_alert && <RegexAlert text='All input fields are required' />}
					{location === '/' && <SearchTip />}
				</form>
			) : null}
		</div>
	)
}

CheckinForm.propTypes = {
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired,
	multiple: PropTypes.bool.isRequired
}

export default CheckinForm;
