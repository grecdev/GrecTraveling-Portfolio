import React, { useState, createContext, useEffect, useContext } from 'react';

export const FormContext = createContext();

import { GlobalContext } from './GlobalContext';

import jump from 'jump.js';

export const FormContextProvider = (props) => {

	const {
		outerClick,
		location,
		changePage,
		pageLoaded,
		isMobile
	} = useContext(GlobalContext);

	// Sometimes we reset the entire form :)
	const defaultFormState = {
		flying_from: '',
		flying_to: '',
		hotel_destination: '',
		checkIn_day: undefined,
		checkIn_month: undefined,
		checkIn_year: undefined,
		checkIn_date: '',
		checkOut_day: undefined,
		checkOut_month: undefined,
		checkOut_year: undefined,
		checkOut_date: '',
		selectedDays: undefined,
		flightsForm_visible: true,
		hotelsForm_visible: false,
		flightCalendarCheckIn_visible: false,
		flightCalendarCheckOut_visible: false,
		hotelCalendarCheckIn_visible: false,
		hotelCalendarCheckOut_visible: false,
		peopleSelectionFlights_visible: false,
		peopleSelectionHotels_visible: false,
		peopleTotal: 1,
		adults: 1,
		youth: 0,
		children: 0,
		infants: 0,
		searchLoader: false,
		filterLoader: false
	};

	const [formState, setFormState] = useState(defaultFormState);

	const defaultRegexState = {
		flightsMultiple_alert: false,
		hotelsMultiple_alert: false,
		flyingTo_alert: false,
		hotelDestination_alert: false,
		fullName_alert: false,
		email_alert: false,
		message_alert: false,
		alertRemove: 2000
	}

	const [regexState, setRegexState] = useState(defaultRegexState);

	const [database, setDatabase] = useState({
		flights_db: [],
		defaultFiltered_flights: [],
		appliedFiltered_flights: [],
		hotels_db: [],
		defaultFiltered_hotels: [],
		appliedFiltered_hotels: [],
	});

	const setFilteredDatabase = (db, type) => {

		type === 'flights' && setDatabase(database => ({ ...database, appliedFiltered_flights: db }));

		type === 'hotels' && setDatabase(database => ({ ...database, appliedFiltered_hotels: db }));

	};

	const calculateSelectedDays = () => {

		let dateStart = new Date(`${formState.checkIn_month < 10 ? '0' + formState.checkIn_month : formState.checkIn_month}/${formState.checkIn_day < 10 ? '0' + formState.checkIn_day : formState.checkIn_day}/${formState.checkIn_year}`).getTime();

		let dateEnd = new Date(`${formState.checkOut_month < 10 ? '0' + formState.checkOut_month : formState.checkOut_month}/${formState.checkOut_day < 10 ? '0' + formState.checkOut_day : formState.checkOut_day}/${formState.checkOut_year}`).getTime();

		let time = dateEnd - dateStart;

		let daysSelected = Math.ceil(time / (1000 * 3600 * 24) + 1);

		!isNaN(daysSelected) && setFormState(formState => ({
			...formState,
			selectedDays: daysSelected
		}))
	}

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
		],
		monthAbbr: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		]
	};

	const [currentMonth, setCurrentMonth] = useState(date.month);
	const [currentYear, setCurrentYear] = useState(date.year);

	const handleChange = e => setFormState({ ...formState, [e.target.id]: e.target.value });

	// Disable for Locations ( to better see the search in action )
	const regexValidation = e => {

		const regex = {
			letters: /^[aA-zZ -]{3,}$/g,
			email: /^[\S\w]+\@{1}(gmail|yahoo|hotmail|aol)\.(com|ro|co|co\.uk|fr)+$/gi,
		}

		const target = e.target;

		if (e.type === 'blur') {

			if (regex.letters.test(target.value.replace(/\n/g, ''))) {

				target.classList.remove('wrong-validation');
				target.classList.add('input-correct');

				target.id === 'flying_to' && setRegexState(regexState => ({ ...regexState, flyingTo_alert: false }));

				target.id === 'hotel_destination' && setRegexState(regexState => ({ ...regexState, hotelDestination_alert: false }));

				e.target.id === 'full-name' && setRegexState(regexState => ({ ...regexState, fullName_alert: false }));

				e.target.id === 'message' && setRegexState(regexState => ({ ...regexState, message_alert: false }));

			} else {

				setRegexState(defaultRegexState);

				target.classList.remove('input-correct');
				target.classList.add('wrong-validation');

				e.target.id === 'flying_to' && setTimeout(() => {

					setRegexState(regexState => ({ ...regexState, flyingTo_alert: true, flightsMultiple_alert: false }));
				}, 50);

				e.target.id === 'hotel_destination' && setTimeout(() => {

					setRegexState(regexState => ({ ...regexState, hotelDestination_alert: true, hotelsMultiple_alert: false }));
				}, 50);

				e.target.id === 'full-name' && setRegexState(regexState => ({ ...regexState, fullName_alert: true }));

				e.target.id === 'message' && setRegexState(regexState => ({ ...regexState, message_alert: true }));
			}

			if (e.target.classList.contains('email-input')) {

				if (regex.email.test(target.value)) {

					target.classList.remove('wrong-validation');
					target.classList.add('input-correct');

					e.target.id === 'email' && setRegexState(regexState => ({ ...regexState, email_alert: false }));

				} else {

					target.classList.remove('input-correct');
					target.classList.add('wrong-validation');

					e.target.id === 'email' && setRegexState(regexState => ({ ...regexState, email_alert: true }));
				}
			}

		}

		if (e.type === 'keydown') {

			// When pressing enter key on an input
			if (e.which === 13) {

				if (regex.letters.test(target.value.replace(/\n/g, ''))) {

					target.classList.remove('wrong-validation');
					target.classList.add('input-correct');

					target.id === 'flying_to' && setRegexState(regexState => ({ ...regexState, flyingTo_alert: false }));

					target.id === 'hotel_destination' && setRegexState(regexState => ({ ...regexState, hotelDestination_alert: false }));

					e.target.id === 'full-name' && setRegexState(regexState => ({ ...regexState, fullName_alert: false }));

					e.target.id === 'message' && setRegexState(regexState => ({ ...regexState, message_alert: false }));

				} else {

					target.classList.remove('input-correct');
					target.classList.add('wrong-validation');

					target.id === 'flying_to' && setRegexState(regexState => ({ ...regexState, flyingTo_alert: true, showRegexAlert: false }));

					target.id === 'hotel_destination' && setRegexState(regexState => ({ ...regexState, hotelDestination_alert: true, showRegexAlert: false }));

					e.target.id === 'full-name' && setRegexState(regexState => ({ ...regexState, fullName_alert: true }));

					e.target.id === 'message' && setRegexState(regexState => ({ ...regexState, message_alert: true }));
				}

				if (e.target.classList.contains('email-input')) {

					if (regex.email.test(target.value)) {

						target.classList.remove('wrong-validation');
						target.classList.add('input-correct');

						e.target.id === 'email' && setRegexState(regexState => ({ ...regexState, email_alert: false }));

					} else {

						target.classList.remove('input-correct');
						target.classList.add('wrong-validation');

						e.target.id === 'email' && setRegexState(regexState => ({ ...regexState, email_alert: true }));
					}
				}
			}

			e.stopPropagation();
		}
	}

	const enableLoading = loaderType => {

		if (loaderType === 'searchLoader') {
			setFormState(formState => ({ ...formState, searchLoader: true }));

			setTimeout(() => setFormState(formState => ({ ...formState, searchLoader: false })), 1000);
		}

		if (loaderType === 'filterLoader') {
			setFormState(formState => ({ ...formState, filterLoader: true }));

			setTimeout(() => setFormState(formState => ({ ...formState, filterLoader: false })), 1000);
		}
	}

	const closeFormMenus = () => {

		setFormState(formState => ({
			...formState,
			hotelCalendarCheckIn_visible: false,
			hotelCalendarCheckOut_visible: false,
			flightCalendarCheckIn_visible: false,
			flightCalendarCheckOut_visible: false,
			peopleSelectionFlights_visible: false,
			peopleSelectionHotels_visible: false,
		}));
	};

	// Show / Hide checkin form
	const displayForm = e => {
		if (e.target.tagName === 'A') {

			const formType = e.target.dataset.checkinType;

			setFormState(defaultFormState);

			formType === 'flights' && setFormState(formState => ({
				...formState,
				flightsForm_visible: true,
				hotelsForm_visible: false
			}));

			formType === 'hotels' && setFormState(formState => ({
				...formState,
				flightsForm_visible: false,
				hotelsForm_visible: true
			}));

			setRegexState(defaultRegexState);

			setRegexState(regexState => ({ ...regexState, formChanged: true }));

			setDatabase(database => ({
				...database,
				defaultFiltered_flights: [],
				appliedFiltered_flights: [],
				defaultFiltered_hotels: [],
				appliedFiltered_hotels: [],
			}));

			document.querySelectorAll('form input:not(.disabled-input)').forEach(input => {

				if (input.id !== 'flight-passengers' && input.id !== 'hotel-people') input.classList.remove('input-correct', 'wrong-validation');

			});
		}
	};

	const formatCalendarMonth = () => `${date.monthName[currentMonth]} ${currentYear}`;

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
		const tbody = document.querySelector('.table-body');

		// Always remove the inner html, because we always add another set of rows / cells
		if (document.body.contains(tbody)) tbody.innerHTML = '';

		let prevMonthDays = getPreviousMonthDays();
		let dayCount = 1;

		for (let r = 0; r < 6; r++) {

			let row = document.createElement('div');
			row.classList.add('table-row');

			for (let c = 0; c < 7; c++) {
				let cell = document.createElement('div');
				cell.classList.add('table-cell');

				// Previous month days
				if (r === 0 && c < firstDayOfMonth()) {

					if (currentMonth === date.month && currentYear === date.year) cell.classList.add('unavailable-day');
					else cell.classList.add('previous-month-day');

					// Get the total days of previous month
					// Get the first day of current month, then decrement the first day with the cells coresponding the previous month days
					// At final increment with 1
					cell.innerHTML = `<span>${prevMonthDays - (firstDayOfMonth() - c) + 1}</span>`;

					row.append(cell);

					// Following month days
				} else if (dayCount > getMonthDays()) {

					cell.classList.add('next-month-day');

					dayCount++;
					// for each day count decrement the total days of the current month
					cell.innerHTML = `<span>${(dayCount - getMonthDays()) - 1}</span>`;

					row.append(cell);
				}
				else {

					cell.innerHTML = `<span>${dayCount}</span>`;
					row.append(cell);
					dayCount++;
				}

				// Current day
				if (parseFloat(cell.textContent) === date.currentDay && parseFloat(cell.textContent) <= getMonthDays() && date.month === currentMonth && date.year === currentYear && !formState.checkIn_day && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day') && !cell.classList.contains('unavailable-day')) cell.classList.add('current-day');

				// Every day before current month
				if (currentYear < date.year || (currentYear === date.year && currentMonth < date.month)) cell.classList.add('unavailable-day');

				// Highlight weekends
				if (c >= 5 && parseFloat(cell.textContent) <= getMonthDays() && currentYear >= date.year) cell.classList.add('weekend-day');

				// Every day before the current day but in the same month
				if (!cell.classList.contains('next-month-day') && parseFloat(cell.textContent) < date.currentDay && currentMonth === date.month && currentYear === date.year) cell.classList.add('before-current-day');

				// Highlight the checkin / checkout day
				if (parseFloat(cell.textContent) === formState.checkIn_day && formState.checkIn_month === currentMonth && formState.checkIn_year === currentYear && parseFloat(cell.textContent) <= getMonthDays() && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day') && !cell.classList.contains('unavailable-day')) {
					cell.classList.add('checkIn-day');
					// Nice ux
					cell.innerHTML += '<span><i class="fas fa-plane-departure"></i><span>';
				}
				if (parseFloat(cell.textContent) === formState.checkOut_day && formState.checkOut_month === currentMonth && formState.checkOut_year === currentYear && parseFloat(cell.textContent) <= getMonthDays() && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day') && !cell.classList.contains('unavailable-day')) {
					cell.classList.add('checkOut-day');
					// Nice ux
					cell.innerHTML += '<span><i class="fas fa-plane-arrival"></i><span>';
				}

				// If we have the same checkin / checkout day
				if (parseFloat(cell.textContent) === formState.checkOut_day && formState.checkOut_month === currentMonth && formState.checkOut_year === currentYear && parseFloat(cell.textContent) === formState.checkIn_day && formState.checkIn_month === currentMonth && formState.checkIn_year === currentYear && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day') && !cell.classList.contains('unavailable-day')) cell.classList.add('checkIn-day', 'checkOut-day');

				// So we don't select a day that is before the checkin day
				if (((!cell.classList.contains('next-month-day') && parseFloat(cell.textContent) < formState.checkIn_day) || (cell.classList.contains('previous-month-day') && parseFloat(cell.textContent) >= formState.checkIn_day)) && currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && (formState.hotelCalendarCheckOut_visible || formState.flightCalendarCheckOut_visible)) cell.classList.add('before-current-day');

				if (parseFloat(cell.textContent) < formState.checkIn_day && cell.classList.contains('previous-month-day') && currentYear === formState.checkIn_year && (formState.hotelCalendarCheckOut_visible || formState.flightCalendarCheckOut_visible) && (formState.checkIn_month + 1) === currentMonth) cell.classList.add('before-current-day');

				// Days between checkin - checkout
				// If checkin month is in the same as checkout month
				if (parseFloat(cell.textContent) >= formState.checkIn_day && parseFloat(cell.textContent) <= formState.checkOut_day && currentMonth === formState.checkIn_month && currentMonth === formState.checkOut_month && currentYear === formState.checkIn_year && currentYear === formState.checkOut_year && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				// If checkout month is past the checkin month - between 1 month
				if (formState.checkOut_month > formState.checkIn_month && currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && parseFloat(cell.textContent) >= formState.checkIn_day && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');
				if (formState.checkOut_month > formState.checkIn_month && currentMonth === formState.checkOut_month && currentYear === formState.checkOut_year && parseFloat(cell.textContent) <= formState.checkOut_day && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				// If checkout month is past the checkin month - between multiple months
				if (formState.checkOut_month > formState.checkIn_month && currentMonth > formState.checkIn_month && currentMonth < formState.checkOut_month && currentYear === formState.checkOut_year && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				// If checkout year is above checkin year, in the checkin year
				if (formState.checkOut_year > formState.checkIn_year && currentMonth > formState.checkIn_month && currentYear === formState.checkIn_year && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				if (formState.checkOut_year > formState.checkIn_year && currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && parseFloat(cell.textContent) >= formState.checkIn_day && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				// If checkout year is above checkin year, in the checkout year
				if (formState.checkOut_year > formState.checkIn_year && currentMonth < formState.checkOut_month && currentYear === formState.checkOut_year && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				if (formState.checkOut_year > formState.checkIn_year && currentMonth === formState.checkOut_month && currentYear === formState.checkOut_year && parseFloat(cell.textContent) <= formState.checkOut_day && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				// If checkout year is above checkin year, between the years
				if (formState.checkOut_year > formState.checkIn_year && currentYear < formState.checkOut_year && currentYear > formState.checkIn_year && !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');
			}
			if (document.body.contains(tbody)) tbody.append(row);
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
			if (currentMonth === date.month && currentYear === date.year) {

				setCurrentMonth(date.month);
				setCurrentYear(date.year);
			}

			// So we don't go past the checkin day
			if (currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && (formState.hotelCalendarCheckOut_visible || formState.flightCalendarCheckOut_visible)) setCurrentMonth(formState.checkIn_month);
		}

		// Increment Month
		if (e.currentTarget.classList.contains('increment-month')) {

			setCurrentMonth(currentMonth => currentMonth + 1);

			if (currentMonth >= 11) {

				setCurrentMonth(0);
				setCurrentYear(currentYear => currentYear + 1);
			};
		}

		// On each click display the tbody
		displayMonthDays();

		e.stopPropagation();
	};

	const selectDate = e => {

		let selectedDay, checkInMonth, checkInYear, checkOutMonth, checkOutYear;

		// Can't use event object in state hook
		selectedDay = parseFloat(e.target.textContent);

		checkInMonth = currentMonth;
		checkInYear = currentYear;
		checkOutMonth = currentMonth;
		checkOutYear = currentYear;

		function change(month, year, type) {

			if (e.target.classList.contains('previous-month-day')) {

				if (currentYear > date.year && currentMonth === 0) {

					setCurrentYear(currentYear => currentYear - 1);

					year = currentYear - 1;

					setCurrentMonth(11);

					month = 11;

				} else if (currentYear >= date.year) {

					setCurrentMonth(currentMonth => currentMonth - 1);

					// state hook is async so it doesn't mutate the value immediately
					month = currentMonth - 1;
				}
			}

			if (e.target.classList.contains('next-month-day')) {
				if (currentYear >= date.year && currentMonth === 11) {

					setCurrentYear(currentYear => currentYear + 1);

					year = currentYear + 1;

					setCurrentMonth(0);

					month = 0;

				} else if (currentYear >= date.year) {

					setCurrentMonth(currentMonth => currentMonth + 1);

					// state hook is async so it doesn't mutate the value immediately
					month = currentMonth + 1;
				}
			}

			if (type === 'checkin') {

				setFormState(formState => ({
					...formState,
					checkIn_day: selectedDay,
					checkIn_month: month,
					checkIn_year: year
				}));

				// Because of the state async problem the data is not mutable
				// If i set it in a variable and after that in the state hook it returns the old value not the new as it supposed to be
				// Format the input && close the calendar
				setFormState(formState => ({
					...formState,
					checkIn_date: `${formState.checkIn_day < 10 ? 0 + formState.checkIn_day.toString() : formState.checkIn_day} / ${formState.checkIn_month < 9 ? 0 + (formState.checkIn_month + 1).toString() : formState.checkIn_month + 1} / ${formState.checkIn_year}`,
					hotelCalendarCheckIn_visible: false,
					flightCalendarCheckIn_visible: false
				}));
			}

			if (type === 'checkout') {

				setFormState(formState => ({
					...formState,
					checkOut_day: selectedDay,
					checkOut_month: month,
					checkOut_year: year
				}));

				// Because of the state async problem the data is not mutable
				// If i set it in a variable and after that in the state hook it returns the old value not the new as it supposed to be
				// Format the input && close the calendar
				setFormState(formState => ({
					...formState,
					checkOut_date: `${formState.checkOut_day < 10 ? 0 + formState.checkOut_day.toString() : formState.checkOut_day} / ${formState.checkOut_month < 9 ? 0 + (formState.checkOut_month + 1).toString() : formState.checkOut_month + 1} / ${formState.checkOut_year}`,
					hotelCalendarCheckOut_visible: false,
					flightCalendarCheckOut_visible: false
				}));
			}
		}

		// Prevent multiple selection in table calendar
		const multipleSelection = String(selectedDay).indexOf('.') !== -1;

		if (!e.target.classList.contains('table-row') && !multipleSelection) {

			if (formState.hotelCalendarCheckIn_visible || formState.flightCalendarCheckIn_visible) change(checkInMonth, checkInYear, 'checkin');

			if (formState.hotelCalendarCheckOut_visible || formState.flightCalendarCheckOut_visible) change(checkOutMonth, checkOutYear, 'checkout')

			// Is same as clicking on the input field, we need to toggle it on again
			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));

			if (formState.flightCalendarCheckIn_visible) {

				document.getElementById('departing-checkin').classList.remove('wrong-validation');
				document.getElementById('departing-checkin').classList.add('input-correct');
			}

			if (formState.flightCalendarCheckOut_visible) {

				document.getElementById('returning-checkout').classList.remove('wrong-validation');
				document.getElementById('returning-checkout').classList.add('input-correct');
			}

			if (formState.hotelCalendarCheckIn_visible) {

				document.getElementById('hotel-checkin').classList.remove('wrong-validation');
				document.getElementById('hotel-checkin').classList.add('input-correct');
			}

			if (formState.hotelCalendarCheckOut_visible) {

				document.getElementById('hotel-checkout').classList.remove('wrong-validation');
				document.getElementById('hotel-checkout').classList.add('input-correct');
			}
		}

		e.stopPropagation();
	}

	const showCalendar = e => {

		if (e.target.id.toLowerCase().includes('checkin') && formState.checkIn_date.length === 0) {

			setCurrentMonth(date.month);
			setCurrentYear(date.year);
		}

		if (e.target.id.toLowerCase().includes('checkout') && formState.checkOut_date.length === 0) {

			setCurrentMonth(date.month);
			setCurrentYear(date.year);
		}

		if (e.target.id.toLowerCase().includes('checkout') && formState.checkIn_date.length > 0 && formState.checkOut_date.length === 0) {

			setCurrentMonth(formState.checkIn_month);
			setCurrentYear(formState.checkIn_year);
		}

		// So if we show again the calendar display the checkin selected month, and not the month that we increment / decrement
		if (e.target.id.toLowerCase().includes('checkin') && formState.checkIn_date.length > 0) {

			setCurrentMonth(formState.checkIn_month);
			setCurrentYear(formState.checkIn_year);

		} else if (e.target.id.toLowerCase().includes('checkout') && formState.checkOut_date.length > 0) {

			setCurrentMonth(formState.checkOut_month);
			setCurrentYear(formState.checkOut_year);
		}

		if (e.target.dataset.menuToggle === 'on') {

			if (!isMobile()) {

				jump(e.target, {
					duration: 500,
					offset: -300
				});
			}

			closeFormMenus();

			// So we have only 1 calendar displayed
			e.target.id === 'departing-checkin' && setFormState(formState => ({ ...formState, flightCalendarCheckIn_visible: true }));
			e.target.id === 'returning-checkout' && setFormState(formState => ({ ...formState, flightCalendarCheckOut_visible: true }));

			e.target.id === 'hotel-checkin' && setFormState(formState => ({ ...formState, hotelCalendarCheckIn_visible: true }));
			e.target.id === 'hotel-checkout' && setFormState(formState => ({ ...formState, hotelCalendarCheckOut_visible: true }));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
			e.target.setAttribute('data-menu-toggle', 'off');

		} else if (e.target.dataset.menuToggle === 'off') {

			closeFormMenus();

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}

		e.stopPropagation();
	};

	const showPeopleSelection = e => {

		if (e.target.dataset.menuToggle === 'on') {

			if (!isMobile()) {

				jump(e.target, {
					duration: 500,
					offset: -300
				});
			}

			closeFormMenus();

			e.target.id.includes('flight') && setFormState(formState => ({ ...formState, peopleSelectionFlights_visible: true }));

			e.target.id.includes('hotel') && setFormState(formState => ({ ...formState, peopleSelectionHotels_visible: true }));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
			e.target.setAttribute('data-menu-toggle', 'off');

		} else if (e.target.dataset.menuToggle === 'off') {

			closeFormMenus();

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}

		e.stopPropagation();
	}

	const selectPeople = e => {

		if (e.target.tagName === 'A') {

			if (e.target.classList.contains('decrement-people')) {

				const decrementButtonValue = e.target.nextElementSibling.id;

				if (formState[decrementButtonValue] > 0) {

					setFormState((formState) => ({ ...formState, peopleTotal: formState.peopleTotal - 1, [decrementButtonValue]: formState[decrementButtonValue] - 1 }));

				} else setFormState((formState) => ({ ...formState, [decrementButtonValue]: 0 }));
			}

			if (e.target.classList.contains('increment-people')) {

				const incrementPeopleType = e.target.previousElementSibling.id;

				if (formState[incrementPeopleType] >= 0) {

					setFormState((formState) => ({ ...formState, peopleTotal: formState.peopleTotal + 1, [incrementPeopleType]: formState[incrementPeopleType] + 1 }));
				}
			}
		}

		if (e.target.tagName === 'BUTTON' && e.target.dataset.enabled === 'true') {

			setFormState(formState => ({
				...formState,
				peopleSelectionFlights_visible: false,
				peopleSelectionHotels_visible: false
			}));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}

		e.stopPropagation();
	}

	// If we set the checkin day above the checkout day
	const resetCalendar = () => {

		// Reset if checkin day / month / year is above checkout day / month / year
		if ((formState.checkIn_day > formState.checkOut_day && formState.checkIn_month >= formState.checkOut_month && formState.checkIn_year === formState.checkOut_year) || (formState.checkIn_day < formState.checkOut_day && formState.checkIn_month > formState.checkOut_month && formState.checkIn_year >= formState.checkOut_year) || formState.checkIn_year > formState.checkOut_year) {

			if (document.body.contains(document.querySelector('form[name="flights"]'))) {

				!document.querySelector('form[name="flights"]').classList.contains('display-none') && document.getElementById('returning-checkout').classList.remove('input-correct');
			}

			if (document.body.contains(document.querySelector('form[name="hotels"]'))) {

				!document.querySelector('form[name="hotels"]').classList.contains('display-none') && document.getElementById('hotel-checkout').classList.remove('input-correct');
			}


			setFormState(formState => (
				{
					...formState,
					checkOut_date: '',
					checkOut_day: undefined,
					checkOut_month: undefined,
					checkOut_year: undefined
				}
			));
		};
	};

	const submitForm = e => {

		const regex = {
			letters: /^[aA-zZ -]{3,}$/g
		}

		let flightsDb = [...database.flights_db];
		let hotelsDb = [...database.hotels_db];

		const target = e.target;

		if (e.type === 'submit') {

			let formSubmitted = false;

			if (target.getAttribute('name') === 'flights') {

				// Departure destination
				// if (formState.flying_from.length > 0) flightsDb = flightsDb.filter(flight => flight.departure.toLowerCase().includes(formState.flying_from.toLowerCase()));

				// By checkin / checkout month
				flightsDb = flightsDb.filter(flight => flight.departureMonth + 1 >= formState.checkIn_month && flight.returningMonth <= formState.checkOut_month + 1);

				// By people available
				flightsDb = flightsDb.filter(flight => flight.people <= formState.peopleTotal);

				// When we change the page / the form classes doesn't remain assigned on inputs
				// formState.flying_from.match(regex.letters) !== null && document.getElementById('flying_from').classList.add('input-correct');

				formState.flying_to.match(regex.letters) !== null && document.getElementById('flying_to').classList.add('input-correct');

				formState.checkIn_date.length > 0 && document.getElementById('departing-checkin').classList.add('input-correct');

				formState.checkOut_date.length > 0 && document.getElementById('returning-checkout').classList.add('input-correct');

				// If all fields are correct
				if (document.querySelectorAll('form[name="flights"] input').length === document.querySelectorAll('form[name="flights"] input.input-correct').length) {

					location !== '/flights' && changePage('/flights');

					if (location === '/flights') {

						if (database.defaultFiltered_flights.length === 0) enableLoading('searchLoader');

						if (database.defaultFiltered_flights.length > 0) enableLoading('filterLoader');
					}

					formSubmitted = true;

					setDatabase(database => ({
						...database,
						defaultFiltered_flights: flightsDb,
						appliedFiltered_flights: flightsDb
					}));

					setRegexState(defaultRegexState);

				} else {

					setRegexState(defaultRegexState);

					setRegexState(regexState => ({ ...regexState, flightsMultiple_alert: true }));
					setTimeout(() => setRegexState(regexState => ({ ...regexState, flightsMultiple_alert: false })), regexState.alertRemove);

					document.querySelectorAll('form[name="flights"] input').forEach(input => {

						!input.classList.contains('input-correct') && input.classList.add('wrong-validation');
					});

					target.style.borderColor = '#e2076a';
					setTimeout(() => target.style = '', regexState.alertRemove);

					formSubmitted = false;
				}
			}

			if (target.getAttribute('name') === 'hotels') {

				// By destination
				hotelsDb = hotelsDb.filter(hotel => hotel.destination.toLowerCase().includes(formState.hotel_destination.toLowerCase()));

				// By checkin / checkout month
				hotelsDb = hotelsDb.filter(hotel => hotel.checkInMonth + 1 >= formState.checkIn_month && hotel.checkOutMonth <= formState.checkOut_month + 1);

				// By people available
				hotelsDb = hotelsDb.filter(hotel => hotel.people <= formState.peopleTotal);

				// When we change the page / the form classes doesn't remain assigned on inputs
				formState.hotel_destination.match(regex.letters) !== null && document.getElementById('hotel_destination').classList.add('input-correct');

				formState.checkIn_date.length > 0 && document.getElementById('hotel-checkin').classList.add('input-correct');

				formState.checkOut_date.length > 0 && document.getElementById('hotel-checkout').classList.add('input-correct');

				// If all fields are correct
				if (document.querySelectorAll('form[name="hotels"] input').length === document.querySelectorAll('form[name="hotels"] input.input-correct').length) {

					location !== '/hotels' && changePage('/hotels');

					if (location === '/hotels') {

						if (database.defaultFiltered_hotels.length === 0) enableLoading('searchLoader');

						if (database.defaultFiltered_hotels.length > 0) enableLoading('filterLoader');
					}

					formSubmitted = true;

					setDatabase(database => ({
						...database,
						defaultFiltered_hotels: hotelsDb,
						appliedFiltered_hotels: hotelsDb
					}));

					setRegexState(defaultRegexState);

				} else {

					setRegexState(defaultRegexState);

					setRegexState(regexState => ({ ...regexState, hotelsMultiple_alert: true }));
					setTimeout(() => setRegexState(regexState => ({ ...regexState, hotelsMultiple_alert: false })), regexState.alertRemove);

					document.querySelectorAll('form[name="hotels"] input').forEach(input => {

						!input.classList.contains('input-correct') && input.classList.add('wrong-validation');
					});

					target.style.borderColor = '#e2076a';
					setTimeout(() => target.style = '', regexState.alertRemove);

					formSubmitted = false;
				}
			}

			if (target.getAttribute('name') === 'contact-us') {

				if (document.querySelectorAll('form[name="contact-us"] .input-field').length === document.querySelectorAll('form[name="contact-us"] .input-correct').length) {

					formSubmitted = true;

				} else {

					document.querySelectorAll('form[name="contact-us"] .input-field').forEach(input => {

						!input.classList.contains('input-correct') && input.classList.add('wrong-validation');
					});

					const defaultValue = document.querySelector('form[name="contact-us"] > button').textContent;

					document.querySelector('form[name="contact-us"] > button').classList.add('error');
					document.querySelector('form[name="contact-us"] > button').textContent = 'All input fields are required';

					setTimeout(() => {

						document.querySelector('form[name="contact-us"] > button').classList.remove('error');
						document.querySelector('form[name="contact-us"] > button').textContent = defaultValue;
					}, 2000);

					formSubmitted = false;
				}
			}

			console.log(formSubmitted, 'Form has been submited ?');
			e.preventDefault();
			return formSubmitted;
		}

		if (e.type === 'keydown' && e.which === 13 && e.target.value.length === 0) {

			e.preventDefault();
			return false;
		}

		e.stopPropagation();
	}

	const getXhr = (target) => {

		return new Promise((resolve, reject) => {

			const xhr = new XMLHttpRequest();

			xhr.open('GET', target, true);

			xhr.onload = () => {

				const response = JSON.parse(xhr.responseText);

				if (xhr.status >= 400) reject(response);
				else resolve(response);
			};

			xhr.onerror = () => reject('Something went wrong');

			xhr.send();
		});
	};

	const getFetch = (target) => {
		return new Promise((resolve, reject) => {

			// Default method is GET but i wanted to do it with an object
			fetch(target)
				.then(res => errorHandling(res))
				.then(data => resolve(data))
				.catch(err => reject(err))

			const errorHandling = (response) => {
				if (!response.ok) throw Error(response.statusText)

				return response.json();
			};
		});
	};

	const getAsync = async (target) => {

		const response = await fetch(target);
		const data = await response.json();

		return data;

	};

	useEffect(() => { document.body.contains(document.querySelector('.table-body')) && displayMonthDays() });

	useEffect(() => {

		resetCalendar();

		calculateSelectedDays();

	}, [formState.checkIn_day, formState.checkOut_day]);

	// So later we can use that state property to filter the hotels
	useEffect(() => {

		getFetch('https://grecdev.github.io/json-api/hotels.json')
			.then(data => setDatabase(database => ({ ...database, hotels_db: data })))
			.catch(err => console.log(err));

		getFetch('https://grecdev.github.io/json-api/flights.json')
			.then(data => setDatabase(database => ({ ...database, flights_db: data })))
			.catch(err => console.log(err));

	}, []);

	// To check if we click outside of the components
	useEffect(() => {

		outerClick && closeFormMenus();

	}, [outerClick]);

	// If we go back on the home page, i want the form to be reseted (personal prefference)
	useEffect(() => {

		location !== '/flights' && setDatabase(database => ({
			...database,
			defaultFiltered_flights: [],
			appliedFiltered_flights: []
		}));

		if (location !== '/hotels' && !location.includes('hotel-room')) {

			setDatabase(database => ({
				...database,
				defaultFiltered_hotels: [],
				appliedFiltered_hotels: []
			}));
		}

		setRegexState(defaultRegexState);

		if (location === '/' || location === '/flights') {

			if (location === '/flights' && database.defaultFiltered_flights.length === 0) setFormState(defaultFormState);

			setFormState(formState => ({
				...formState,
				flightsForm_visible: true,
				hotelsForm_visible: false
			}));
		}

		if (location === '/hotels' && database.defaultFiltered_hotels.length === 0) {

			setFormState(defaultFormState);

			setFormState(formState => ({
				...formState,
				flightsForm_visible: false,
				hotelsForm_visible: true
			}));
		}

	}, [location]);

	useEffect(() => {

		// If we refresh the hotel room page
		if (pageLoaded && location.includes('hotel-room') && database.appliedFiltered_hotels.length === 0) changePage('/hotels');

	}, [pageLoaded, location]);

	return (
		<FormContext.Provider value={{
			...formState,
			...date,
			...database,
			...regexState,
			displayForm,
			showCalendar,
			handleChange,
			formatCalendarMonth,
			selectDate,
			changeMonth,
			showPeopleSelection,
			selectPeople,
			submitForm,
			setFilteredDatabase,
			enableLoading,
			regexValidation
		}}>
			{props.children}
		</FormContext.Provider>
	)
}

export default FormContextProvider;
