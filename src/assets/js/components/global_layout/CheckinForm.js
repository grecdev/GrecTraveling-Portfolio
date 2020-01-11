import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CheckinForm = ({ flights, hotels }) => {

	// To better see it in the devtools
	const [formState, setFormState] = useState({
		hotel_destination: '',
		checkIn_formatedDate: '',
		checkIn_day: null,
		checkIn_month: null,
		checkIn_year: null,
		checkOut_formatedDate: '',
		checkOut_day: null,
		checkOut_month: null,
		checkOut_year: null,
		people: 1,
		calendar_visible: false
	});

	const handleChange = e => setFormState({ ...formState, [e.target.id]: e.target.value });

	// Show / Hide checkin form
	const displayForm = e => {
		if (e.target.tagName === 'A') {
			const formType = e.target.dataset.checkinType;

			document.querySelectorAll('.checkin-form').forEach(form => form.classList.replace('display-flex', 'display-none'));
			document.getElementById(formType).classList.replace('display-none', 'display-flex');

			document.querySelectorAll('.active-checkin').forEach(btn => btn.classList.remove('active-checkin'));
			e.target.classList.add('active-checkin');

			setFormState(formState => ({ ...formState, calendar_visible: false }));
		}
	};

	const date = {
		currentDay: new Date().getDate(),
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
		monthName: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		weekdayName: [
			'Mon',
			'Tue',
			'Wed',
			'Thu',
			'Fri',
			'Sat',
			'Sun'
		]
	};

	let [currentMonth, setCurrentMonth] = useState(date.month);
	let [currentYear, setCurrentYear] = useState(date.year);

	const formatDate = () => `${date.monthName[currentMonth]} ${currentYear}`;

	const getMonthDays = (month = currentMonth, year = currentYear) => {
		let totalDays;

		// From our date.monthName
		const month31 = [0, 2, 4, 6, 7, 9, 11];
		// For February
		const leapYear = year % 4 === 0;

		totalDays = month === 1 ? leapYear ? 29 : 28 : month31.includes(month) ? 31 : 30;

		return totalDays;
	}

	const getPreviousMonthDays = () => {

		let prevMonth, prevYear;

		if (currentMonth > 1) {
			prevMonth = currentMonth - 1
			prevYear = currentYear;
		} else {
			prevMonth = 11;
			prevYear = currentYear - 1;
		}

		return getMonthDays(prevMonth, prevYear);
	}

	const firstDayOfMonth = () => {

		let firstDay = new Date(currentYear, currentMonth).getDay() - 1;

		firstDay === -1 ? firstDay = 6 : firstDay;

		return firstDay;
	}

	// Display the calendar
	const displayMonthDays = () => {
		const tbody = document.querySelector('.checkin-calendar table tbody');

		// Always remove the inner html, because we always add another set of rows / cells
		tbody.innerHTML = '';

		let prevMonthDays = getPreviousMonthDays();
		let dayCount = 1;

		for (let r = 0; r < 6; r++) {

			let row = document.createElement('tr');

			for (let c = 0; c < 7; c++) {
				let cell = document.createElement('td');

				// Previous month days
				if (r === 0 && c < firstDayOfMonth()) {

					if (currentMonth === date.month) cell.classList.add('unavailable-day');
					else cell.classList.add('available-day');

					// Get the total days of previous month
					// Get the first day of current month, then decrement the first day with the cells coresponding the previous month days
					// At final increment with 1
					cell.textContent = prevMonthDays - (firstDayOfMonth() - c) + 1;

					row.append(cell);

					// Following month days
				} else if (dayCount > getMonthDays()) {

					cell.classList.add('available-day');

					dayCount++;
					// for each day count decrement the total days of the current month
					cell.textContent = (dayCount - getMonthDays()) - 1;

					row.append(cell);
				}
				else {
					cell.textContent = dayCount;
					row.append(cell);
					dayCount++;
				}

				// Current day
				if (parseFloat(cell.textContent) === date.currentDay && dayCount <= getMonthDays() && date.month === currentMonth && date.year === currentYear && !formState.checkIn_day) cell.classList.add('current-day');
				// Every day before current month
				if (currentYear < date.year) cell.classList.add('unavailable-day');
				// Highlight weekends
				if (c >= 5 && parseFloat(cell.textContent) <= getMonthDays() && currentMonth >= date.month && currentYear >= date.year) cell.classList.add('weekend-day');
				// Every day before the current day but in the same month
				if (r <= 3 && parseFloat(cell.textContent) < date.currentDay && currentMonth === date.month && currentYear === date.year) cell.classList.add('before-current-day');
				// Highlight the checkin day
				if (parseFloat(cell.textContent) === formState.checkIn_day && formState.checkIn_month === currentMonth && formState.checkIn_year === currentYear) cell.classList.add('selected-day');
			}
			tbody.append(row);
		}
	}

	const changeMonth = e => {

		// Decrement month
		if (e.currentTarget.classList.contains('decrement-month')) {

			setCurrentMonth(currentMonth => currentMonth - 1);

			if (currentMonth <= 0) {

				setCurrentMonth(11);

				setCurrentYear(currentYear => currentYear - 1);
			}

			// So we don't go past the current month (if you want to see if the passed months are correct displayed disable this)
			if (currentMonth <= date.month && currentYear === date.year) {
				setCurrentMonth(date.month);
				setCurrentYear(date.year);
			}
		}

		// Increment Month
		if (e.currentTarget.classList.contains('increment-month')) {
			setCurrentMonth(currentMonth => currentMonth + 1);

			if (currentMonth >= 11) {
				setCurrentMonth(0);
				setCurrentYear(currentYear => currentYear + 1);
			};
		}

		// On each click re-render the tbody
		displayMonthDays();

		e.stopPropagation();
	};

	const selectDate = e => {
		if (e.target.tagName === 'TD') {
			let formatInputDate = `${parseFloat(e.target.textContent) < 10 ? 0 + e.target.textContent : e.target.textContent} / ${currentMonth < 10 && 0 + String(currentMonth + 1)} / ${currentYear}`;

			// Because we can't use event object in the useState hook
			let selectedDay = parseFloat(e.target.textContent);

			setFormState(formState => ({ ...formState, checkIn_formatedDate: formatInputDate, calendar_visible: false, checkIn_day: selectedDay, checkIn_month: currentMonth, checkIn_year: currentYear }));
		}
	}

	const showCalendar = () => setFormState(formState => ({ ...formState, calendar_visible: true }));

	useEffect(() => {
		document.body.contains(document.querySelector('.checkin-calendar')) && displayMonthDays();
	});

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
						<input type="text" id='hotel_destination' placeholder='Enter a destination or hotel name' name='hotel_destination' onChange={handleChange} value={formState.hotel_destination} />
					</div>

					<div className="form-box">
						<label htmlFor="hotel_checkIn">Check-In:</label>
						<input type="text" id='hotel_checkIn' placeholder='DD / MM / YY' name='hotel_checkIn' onClick={showCalendar} onChange={handleChange} value={formState.checkIn_formatedDate} readOnly />

						{formState.calendar_visible && (
							<div className="checkin-calendar">
								<div className='calendar-triangle'></div>

								<div className="calendar-month">
									<button type='button' className="decrement-month calendar-arrow" onClick={changeMonth}><i className="far fa-arrow-alt-circle-left"></i></button>
									<p className='date-name mx-1 text-center'>{formatDate()}</p>
									<button type='button' className="increment-month calendar-arrow" onClick={changeMonth}><i className="far fa-arrow-alt-circle-right"></i></button>
								</div>

								<table>
									<thead>
										<tr>
											{date.weekdayName.map((day, index) => <th key={index + 1}>{day}</th>)}
										</tr>
									</thead>
									<tbody onClick={selectDate} >
									</tbody>
								</table>
							</div>
						)}
					</div>

					<div className="form-box">
						<label htmlFor="hotel_checkOut">Check-Out:</label>
						<input type="text" id='hotel_checkOut' placeholder='DD / MM / YY' name='hotel_checkOut' value={formState.checkOut_date} readOnly />
					</div>

					<div className="form-box">
						<label htmlFor="hotel_people">People:</label>
						<input type="text" id='hotel_people' name='hotel_people' onChange={handleChange} readOnly value={formState.people} />
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
