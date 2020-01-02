import React from 'react';

const CheckinForm = () => {

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
				<a data-checkin-type='flights' className='active-checkin'>Flights</a>
				<a data-checkin-type='hotels'>Hotels</a>
				<a data-checkin-type='cars'>Cars</a>
				<a data-checkin-type='cruises'>Cruises</a>
			</div>

			<form name='flights' id='flights' className='p-1 checkin-form display-flex'>

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

			<form name='hotels' id='hotels' className='p-1 checkin-form display-none'>

				<div className="form-box">
					<label htmlFor="hotel-name">City or Hotel name (optional):</label>
					<input type="text" id='hotel-name' placeholder='Enter a destination or hotel name' name='hotel-name' />
				</div>

				<div className="form-box">
					<label htmlFor="check-in">Check-In:</label>
					<input type="text" id='check-in' placeholder='MM / DD / YY' name='check-in' />
				</div>

				<div className="form-box">
					<label htmlFor="check-out">Check-Out:</label>
					<input type="text" id='check-out' placeholder='MM / DD / YY' name='check-out' />
				</div>

				<div className="form-box">
					<label htmlFor="people">People:</label>
					<input type="text" id='people' value={1} readOnly name='people' />
				</div>

				<button type='submit'><i className="fas fa-search"></i></button>
			</form>

			<form name='cars' id='cars' className='p-1 checkin-form display-none'>

				<div className="form-box">
					<label htmlFor="car-location">Location:</label>
					<input type="text" id='car-location' placeholder='Please type a location' name='car-location' />
				</div>

				<div className="form-box">
					<label htmlFor="car-pickup">Pick up date:</label>
					<input type="text" id='car-pickup' placeholder='MM / DD / YY' name='car-pickup' />
				</div>

				<div className="form-box">
					<label htmlFor="car-dropoff">Drop off date:</label>
					<input type="text" id='car-dropoff' placeholder='MM / DD / YY' name='car-dropoff' />
				</div>

				<div className="form-box">
					<label htmlFor="car-type">Car type:</label>
					<input type="text" id='car-type' placeholder='All cars' name='car-type' />
				</div>

				<button type='submit'><i className="fas fa-search"></i></button>
			</form>

			<form name='cruises' id='cruises' className='p-1 checkin-form display-none'>

				<div className="form-box">
					<label htmlFor="sail-from">Sail from:</label>
					<input type="text" id='sail-from' placeholder='Please type a location' name='sail-from' />
				</div>

				<div className="form-box">
					<label htmlFor="sail-to">Sail to:</label>
					<input type="text" id='sail-to' placeholder='Please type a location' name='sail-to' />
				</div>

				<div className="form-box">
					<label htmlFor="start-date">Start Date:</label>
					<input type="text" id='start-date' placeholder='MM / DD / YY' name='start-date' />
				</div>

				<div className="form-box">
					<label htmlFor="end-date">End of Date:</label>
					<input type="text" id='end-date' placeholder='MM / DD / YY' name='end-date' />
				</div>

				<div className="form-box">
					<label htmlFor="cruise-ship">Cruise Ship:</label>
					<input type="text" id='cruise-ship' placeholder='All ships' name='cruise-ship' />
				</div>

				<button type='submit'><i className="fas fa-search"></i></button>
			</form>
		</div>
	)
}

export default CheckinForm;
