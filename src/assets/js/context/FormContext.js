import React, { useState, createContext, useEffect, useContext } from 'react';

export const FormContext = createContext();

import { GlobalContext } from './GlobalContext';

export const FormContextProvider = (props) => {

	const { outerClick, location, changePage } = useContext(GlobalContext);

	// Sometimes we reset the entire form :)
	const initialState = {
		hotel_destination: '',
		flying_from: '',
		flying_to: '',
		checkIn_day: undefined,
		checkIn_month: undefined,
		checkIn_year: undefined,
		checkIn_date: '',
		checkOut_day: undefined,
		checkOut_month: undefined,
		checkOut_year: undefined,
		checkOut_date: '',
		peopleTotal: 1,
		adults: 1,
		youth: 0,
		children: 0,
		infants: 0,
		flightCalendarCheckIn_visible: false,
		flightCalendarCheckOut_visible: false,
		hotelCalendarCheckIn_visible: false,
		hotelCalendarCheckOut_visible: false,
		peopleSelection_visible: false
	}

	const [formState, setFormState] = useState(initialState);

	const [database, setDatabase] = useState({
		flights_db: [],
		defaultFiltered_flights: [],
		appliedFiltered_flights: [],
		hotels_db: [],
		defaultFiltered_hotels: [],
		appliedFiltered_hotels: [],
	});

	const setFilteredDatabase = (db, type) => {

		type === 'flights' && setDatabase(database => ({ ...database, appliedFiltered_flights: db }))

		// type === 'hotels' && setDatabase(database => ({ ...database, filtered_hotels: db }))

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

	const closeFormMenus = () => {

		setFormState(formState => ({
			...formState,
			hotelCalendarCheckIn_visible: false,
			hotelCalendarCheckOut_visible: false,
			flightCalendarCheckIn_visible: false,
			flightCalendarCheckOut_visible: false,
			peopleSelection_visible: false,
		}));
	};

	// Show / Hide checkin form
	const displayForm = e => {
		if (e.target.tagName === 'A' && !e.target.classList.contains('active-form')) {

			const formType = e.target.dataset.checkinType;

			document.querySelectorAll('.checkin-form').forEach(form => form.classList.replace('display-flex', 'display-none'));
			document.querySelector(`form[name=${formType}]`).classList.replace('display-none', 'display-flex');

			document.querySelectorAll('.active-form').forEach(btn => btn.classList.remove('active-form'));
			e.target.classList.add('active-form');

			setFormState(initialState);
			setDatabase(database => ({
				...database,
				defaultFiltered_flights: [],
				appliedFiltered_flights: [],
				defaultFiltered_hotels: []
			}))
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
				if (parseFloat(cell.textContent) === date.currentDay && dayCount <= getMonthDays() && date.month === currentMonth && date.year === currentYear && !formState.checkIn_day) cell.classList.add('current-day');

				// Every day before current month
				if (currentYear < date.year) cell.classList.add('unavailable-day');

				// Highlight weekends
				if (c >= 5 && parseFloat(cell.textContent) <= getMonthDays() && currentMonth >= date.month && currentYear >= date.year) cell.classList.add('weekend-day');

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

		if (!e.target.classList.contains('table-row')) {

			if (formState.hotelCalendarCheckIn_visible || formState.flightCalendarCheckIn_visible) {

				if (e.target.classList.contains('previous-month-day')) {

					if (currentYear > date.year && currentMonth === 0) {

						setCurrentYear(currentYear => currentYear - 1);

						checkInYear = currentYear - 1;

						setCurrentMonth(11);

						checkInMonth = 11;

					} else if (currentYear >= date.year) {

						setCurrentMonth(currentMonth => currentMonth - 1);

						// state hook is async so it doesn't mutate the value immediately
						checkInMonth = currentMonth - 1;
					}
				}

				if (e.target.classList.contains('next-month-day')) {
					if (currentYear >= date.year && currentMonth === 11) {

						setCurrentYear(currentYear => currentYear + 1);

						checkInYear = currentYear + 1;

						setCurrentMonth(0);

						checkInMonth = 0;

					} else if (currentYear >= date.year) {

						setCurrentMonth(currentMonth => currentMonth + 1);

						// state hook is async so it doesn't mutate the value immediately
						checkInMonth = currentMonth + 1;
					}
				}

				setFormState(formState => ({
					...formState,
					checkIn_day: selectedDay,
					checkIn_month: checkInMonth,
					checkIn_year: checkInYear
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

			if (formState.hotelCalendarCheckOut_visible || formState.flightCalendarCheckOut_visible) {

				if (e.target.classList.contains('previous-month-day')) {

					if (currentYear > date.year && currentMonth === 0) {

						setCurrentYear(currentYear => currentYear - 1);

						checkOutYear = currentYear - 1;

						setCurrentMonth(11);

						checkOutMonth = 11;

					} else if (currentYear >= date.year) {

						setCurrentMonth(currentMonth => currentMonth - 1);

						// state hook is async so it doesn't mutate the value immediately
						checkOutMonth = currentMonth - 1;
					}
				}

				if (e.target.classList.contains('next-month-day')) {
					if (currentYear >= date.year && currentMonth === 11) {

						setCurrentYear(currentYear => currentYear + 1);

						checkOutYear = currentYear + 1;

						setCurrentMonth(0);

						checkOutMonth = 0;

					} else if (currentYear >= date.year) {

						setCurrentMonth(currentMonth => currentMonth + 1);

						// state hook is async so it doesn't mutate the value immediately
						checkOutMonth = currentMonth + 1;
					}
				}

				setFormState(formState => ({
					...formState,
					checkOut_day: selectedDay,
					checkOut_month: checkOutMonth,
					checkOut_year: checkOutYear
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

			// Is same as clicking on the input field, we need to toggle it on again
			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}

		e.stopPropagation();
	}

	const showCalendar = e => {

		if (formState.checkIn_date.length === 0 && formState.checkOut_date.length === 0) {

			setCurrentMonth(date.month);
			setCurrentYear(date.year);
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

			closeFormMenus();

			setFormState(formState => ({ ...formState, peopleSelection_visible: true }));

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

		if (e.target.tagName === 'BUTTON') {

			setFormState(formState => ({
				...formState,
				peopleSelection_visible: false
			}));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}

		e.stopPropagation();
	}

	// If we set the checkin day above the checkout day
	const resetCalendar = () => {

		// Reset if checkin day / month / year is above checkout day / month / year
		if ((formState.checkIn_day > formState.checkOut_day && formState.checkIn_month >= formState.checkOut_month && formState.checkIn_year === formState.checkOut_year) || (formState.checkIn_day < formState.checkOut_day && formState.checkIn_month > formState.checkOut_month && formState.checkIn_year >= formState.checkOut_year) || formState.checkIn_year > formState.checkOut_year) {

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

		// Prevent multiple selection in table calendar
		String(formState.checkIn_day).indexOf('.') !== -1 && setFormState(formState => (
			{
				...formState,
				checkIn_date: '',
				checkIn_day: undefined,
				checkIn_month: undefined,
				checkIn_year: undefined
			}
		));

		String(formState.checkOut_day).indexOf('.') !== -1 && setFormState(formState => (
			{
				...formState,
				checkOut_date: '',
				checkOut_day: undefined,
				checkOut_month: undefined,
				checkOut_year: undefined
			}
		));
	};

	const filterSearch = e => {

		let hotelsDb = [...database.hotels_db];
		let flightsDb = [...database.flights_db];

		if (e.target.getAttribute('name') === 'flights') {

			// Departure destination
			if (formState.flying_from.length > 0) flightsDb = flightsDb.filter(flight => flight.departure.toLowerCase().includes(formState.flying_from.toLowerCase()));

			// By checkin / checkout month
			flightsDb = flightsDb.filter(flight => flight.departureMonth >= (formState.checkIn_month + 1) && flight.returningMonth <= (formState.checkOut_month + 1));

			// By people available
			flightsDb = flightsDb.filter(flight => flight.people <= formState.peopleTotal);

			// if (location !== '/flights' && formState.flying_from.length > 0 && formState.flying_to.length > 0 && formState.checkIn_date.length > 0 && formState.checkOut_date.length > 0) changePage('/flights');

			if (location !== '/flights') changePage('/flights');

			console.log(flightsDb);
			setDatabase(database => ({ ...database, defaultFiltered_flights: flightsDb, appliedFiltered_flights: flightsDb }));
		}

		if (e.target.getAttribute('name') === 'hotels') {

			// By destination
			if (formState.hotel_destination.length > 0) hotelsDb = hotelsDb.filter(hotel => hotel.destination.toLowerCase().includes(formState.hotel_destination.toLowerCase()));

			// By checkin / checkout month
			hotelsDb = hotelsDb.filter(hotel => hotel.checkInMonth >= (formState.checkIn_month + 1) && hotel.checkOutMonth <= (formState.checkOut_month + 1));

			// By people available
			hotelsDb = hotelsDb.filter(hotel => hotel.people <= formState.peopleTotal);

			// if (location !== '/hotels' && formState.hotel_destination.length > 0 && formState.checkIn_date.length > 0 && formState.checkOut_date.length > 0) changePage('/hotels');

			if (location !== '/hotels') changePage('/hotels');

			console.log(hotelsDb);
			setDatabase(database => ({ ...database, defaultFiltered_hotels: hotelsDb }));
		}

		e.preventDefault();
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

		location === '/' && setFormState(initialState);

	}, [location]);

	return (
		<FormContext.Provider value={{
			...formState,
			...date,
			...database,
			displayForm,
			showCalendar,
			handleChange,
			formatCalendarMonth,
			selectDate,
			changeMonth,
			showPeopleSelection,
			selectPeople,
			filterSearch,
			setFilteredDatabase
		}}>
			{props.children}
		</FormContext.Provider>
	)
}

export default FormContextProvider;
