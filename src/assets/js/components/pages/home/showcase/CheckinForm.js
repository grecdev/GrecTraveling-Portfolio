import React, { useContext, useState, useEffect } from 'react';

import { CheckinContext } from '../../../../context/checkin/CheckinContext';

const CheckinForm = () => {

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

	const { hotel_destination, hotel_checkIn, hotel_checkOut, hotel_people, handleChange, formatDates } = useContext(CheckinContext);

	const date = {
		date: new Date().getDate(),
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

	const formatDate = () => `${date.monthName[date.month]} ${date.year}`;

	const getMonthDays = (month = date.month, year = date.year) => {
		let totalDays;

		// From our date.monthName
		const month31 = [0, 2, 4, 6, 7, 9, 11];
		// For February
		const leapYear = year % 4 === 0;

		totalDays = month === 1 ? leapYear ? 29 : 28 : month31.includes(month) ? 31 : 30;

		return totalDays;
	}

	const getPreviousMonthDays = (month = date.month, year = date.year) => {

		let prevMonth, prevYear;

		if (month > 1) {
			prevMonth = month - 1
			prevYear = year;
		} else {
			prevMonth = 11;
			prevYear = year - 1;
		}

		return getMonthDays(prevMonth, prevYear);
	}

	const getNextMonthDays = (month = date.month, year = date.year) => {

		let nextMonth, nextYear;

		if (month < 11) {
			nextMonth = month + 1;
			nextYear = year;
		} else {
			nextMonth = 1;
			nextYear = year + 1;
		}

		return getMonthDays(nextMonth, nextYear);
	}

	const firstDayOfMonth = () => {

		let firstDay = new Date(date.year, date.month).getDay() - 1;

		firstDay === -1 ? firstDay = 6 : firstDay;

		return firstDay;
	}

	const displayMonthDays = () => {

		const tbody = document.querySelector('table tbody');
		let prevMonthDays = getPreviousMonthDays();
		let dayCount = 1;

		for (let r = 0; r < 6; r++) {

			let row = document.createElement('tr');

			for (let c = 0; c < 7; c++) {

				if (r === 0 && c < firstDayOfMonth()) {
					let cell = document.createElement('td');

					cell.classList.add('unavailable');

					cell.textContent = prevMonthDays - (firstDayOfMonth() - c) + 1;

					row.append(cell);

				} else if (dayCount > getMonthDays()) {

					let cell = document.createElement('td');

					cell.classList.add('unavailable');

					dayCount++;
					cell.textContent = (dayCount - getMonthDays()) - 1;

					row.append(cell);
				}
				else {
					let cell = document.createElement('td');
					cell.textContent = dayCount;
					row.append(cell);
					dayCount++;
				}
			}
			tbody.append(row);
		}
	}

	useEffect(() => displayMonthDays());

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
							<div className="left-arrow"><i className="far fa-arrow-alt-circle-left"></i></div>
							<p className='date-name mx-3'>{formatDate()}</p>
							<div className="right-arrow"><i className="far fa-arrow-alt-circle-right"></i></div>
						</div>

						<table>
							<thead>
								<tr>
									{date.weekdayName.map((day, index) => <th key={index + 1}>{day}</th>)}
								</tr>
							</thead>
							<tbody>
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
