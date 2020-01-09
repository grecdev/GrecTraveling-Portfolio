import React, { useContext, useState, useEffect } from 'react';

import { CheckinContext } from '../../../../context/checkin/CheckinContext';

const CheckinForm = () => {

	const { hotel_destination, hotel_checkIn, hotel_checkOut, hotel_people, handleChange, formatDates, selectDate } = useContext(CheckinContext);

	// Show / Hide checkin form
	const displayForm = e => {
		if (e.target.tagName === 'A') {
			const formType = e.target.dataset.checkinType;

			document.querySelectorAll('.checkin-form').forEach(form => form.classList.replace('display-flex', 'display-none'));
			document.getElementById(formType).classList.replace('display-none', 'display-flex');

			document.querySelectorAll('.active-checkin').forEach(btn => btn.classList.remove('active-checkin'));
			e.target.classList.add('active-checkin');
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
		const tbody = document.querySelector('table tbody');
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

					if(currentMonth === date.month) cell.classList.add('unavailable-day');
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
				if (cell.textContent === String(date.currentDay) && dayCount <= getMonthDays() && date.month === currentMonth && date.year === currentYear) cell.classList.add('current-day');
				// Every day before current month
				if (currentYear < date.year) cell.classList.add('unavailable-day');
				// Highlight weekends
				if (c >= 5 && parseFloat(cell.textContent) <= getMonthDays() && currentMonth >= date.month && currentYear >= date.year) cell.classList.add('weekend-day');
				// Every day before the current day but in the same month
				if (r <= 3 && parseFloat(cell.textContent) < date.currentDay && currentMonth === date.month && currentYear === date.year) cell.classList.add('before-current-day');

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

	useEffect(() => {
		displayMonthDays();
	});

	return (
		<div className='form-container'>
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
					<input type="text" id='hotel_checkIn' placeholder='DD / MM / YY' name='hotel_checkIn' onChange={handleChange} value={hotel_checkIn} readOnly />

					<div className="checkin-calendar">
						<div className='calendar-triangle'></div>

						<div className="calendar-month">
							<div className="decrement-month calendar-arrow" onClick={changeMonth}><i className="far fa-arrow-alt-circle-left"></i></div>
							<p className='date-name mx-1 text-center'>{formatDate()}</p>
							<div className="increment-month calendar-arrow" onClick={changeMonth}><i className="far fa-arrow-alt-circle-right"></i></div>
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
				</div>

				<div className="form-box">
					<label htmlFor="hotel_checkOut">Check-Out:</label>
					<input type="text" id='hotel_checkOut' placeholder='DD / MM / YY' name='hotel_checkOut' onChange={formatDates} value={hotel_checkOut} readOnly />
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
