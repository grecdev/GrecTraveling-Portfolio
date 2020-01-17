import React, { useState, createContext, useEffect } from 'react';

export const FormContext = createContext();

export const FormContextProvider = (props) => {

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
		calendarCheckIn_visible: false,
		calendarCheckOut_visible: false,
		peopleSelection_visible: false
	}

	const [formState, setFormState] = useState(initialState);

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

	const handleChange = e => setFormState({ ...formState, [e.target.id]: e.target.value });

	const closeFormMenus = e => {

		// Checking for ids
		const regex = /checkin|checkout|people|passengers/gi;

		if (!e.target.closest('.people-selection') && !e.target.closest('.checkin-calendar')) setFormState(formState => ({
			...formState,
			peopleSelection_visible: false,
			calendarCheckIn_visible: false,
			calendarCheckOut_visible: false
		}));

		if (e.target.closest('.people-selection') || e.target.closest('.checkin-calendar') || regex.test(e.target.id)) return false;
		else document.querySelectorAll('[data-menu-toggle').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
	};

	// Show / Hide checkin form
	const displayForm = e => {
		if (e.target.tagName === 'A') {

			const formType = e.target.dataset.checkinType;

			document.querySelectorAll('.checkin-form').forEach(form => form.classList.replace('display-flex', 'display-none'));
			document.querySelector(`form[name=${formType}]`).classList.replace('display-none', 'display-flex');

			document.querySelectorAll('.active-form').forEach(btn => btn.classList.remove('active-form'));
			e.target.classList.add('active-form');

			setFormState(initialState);
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
				if (((!cell.classList.contains('next-month-day') && parseFloat(cell.textContent) < formState.checkIn_day) || (cell.classList.contains('previous-month-day') && parseFloat(cell.textContent) >= formState.checkIn_day)) && currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && formState.calendarCheckOut_visible) cell.classList.add('before-current-day');

				if (parseFloat(cell.textContent) < formState.checkIn_day && cell.classList.contains('previous-month-day') && currentYear === formState.checkIn_year && formState.calendarCheckOut_visible && (formState.checkIn_month + 1) === currentMonth) cell.classList.add('before-current-day');

				// Days between checkin - checkout
				// In the same month
				if (parseFloat(cell.textContent) > formState.checkIn_day && parseFloat(cell.textContent) < formState.checkOut_day	&& !cell.classList.contains('unavailable-day') && !cell.classList.contains('next-month-day') && formState.checkIn_month >= currentMonth && formState.checkOut_month <= currentMonth && (formState.checkIn_year === currentYear || formState.checkOut_year === currentYear)) cell.classList.add('selected');
				
				// If we have the checkout day past the checkin month
				if(currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && formState.checkOut_month > formState.checkIn_month && formState.checkIn_day <= parseFloat(cell.textContent) && !cell.classList.contains('unavailable-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');
				if(currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && formState.checkOut_month > formState.checkIn_month && formState.checkIn_day >= parseFloat(cell.textContent) && cell.classList.contains('next-month-day')) cell.classList.add('selected');
				
				// If we have the checkin day before the checkout month
				if(currentMonth === formState.checkOut_month && currentYear === formState.checkOut_year && formState.checkOut_month > formState.checkIn_month && formState.checkOut_day >= parseFloat(cell.textContent) && !cell.classList.contains('next-month-day') && !cell.classList.contains('previous-month-day')) cell.classList.add('selected');
				if(currentMonth === formState.checkOut_month && currentYear === formState.checkOut_year && formState.checkOut_month > formState.checkIn_month && formState.checkOut_day <= parseFloat(cell.textContent) && !cell.classList.contains('next-month-day') && cell.classList.contains('previous-month-day')) cell.classList.add('selected');

				// Between the checkin month and checkout month highlight all days
				if(formState.checkOut_month > formState.checkIn_month && currentMonth < formState.checkOut_month && currentMonth > formState.checkIn_month && currentYear === formState.checkOut_year) cell.classList.add('selected');	

				if(formState.checkOut_month > formState.checkIn_month && currentMonth === formState.checkOut_month && currentMonth > formState.checkIn_month && currentYear === formState.checkOut_year && parseFloat(cell.textContent) <= formState.checkOut_day && !cell.classList.contains('next-month-day')) cell.classList.add('selected');
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
			if (currentMonth === formState.checkIn_month && currentYear === formState.checkIn_year && formState.calendarCheckOut_visible) setCurrentMonth(formState.checkIn_month);
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

			if (formState.calendarCheckIn_visible) {

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
					...formState, checkIn_date: `${formState.checkIn_day < 10 ? 0 + formState.checkIn_day.toString() : formState.checkIn_day} / ${formState.checkIn_month < 9 ? 0 + (formState.checkIn_month + 1).toString() : formState.checkIn_month + 1} / ${formState.checkIn_year}`, calendarCheckIn_visible: false
				}));
			}

			if (formState.calendarCheckOut_visible) {

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
					checkOut_date: `${formState.checkOut_day < 10 ? 0 + formState.checkOut_day.toString() : formState.checkOut_day} / ${formState.checkOut_month < 9 ? 0 + (formState.checkOut_month + 1).toString() : formState.checkOut_month + 1} / ${formState.checkOut_year}`, calendarCheckOut_visible: false
				}));
			}

			// Is same as clicking on the input field, we need to toggle it on again
			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}
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

		// So we have only 1 calendar displayed
		if (e.target.dataset.menuToggle === 'on') {

			e.target.id.toLowerCase().includes('checkin') && setFormState(formState => ({ ...formState, calendarCheckIn_visible: true, calendarCheckOut_visible: false, peopleSelection_visible: false }));
			e.target.id.toLowerCase().includes('checkout') && setFormState(formState => ({ ...formState, calendarCheckOut_visible: true, calendarCheckIn_visible: false, peopleSelection_visible: false }));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
			e.target.setAttribute('data-menu-toggle', 'off');

		} else if (e.target.dataset.menuToggle === 'off') {

			e.target.id.toLowerCase().includes('checkin') && setFormState(formState => ({ ...formState, calendarCheckIn_visible: false }));
			e.target.id.toLowerCase().includes('checkout') && setFormState(formState => ({ ...formState, calendarCheckOut_visible: false }));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}

		e.stopPropagation();
	};

	const showPeopleSelection = e => {

		if (e.target.dataset.menuToggle === 'on') {

			setFormState(formState => ({ ...formState, peopleSelection_visible: true, calendarCheckIn_visible: false, calendarCheckOut_visible: false }));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
			e.target.setAttribute('data-menu-toggle', 'off');

		} else if (e.target.dataset.menuToggle === 'off') {

			setFormState(formState => ({ ...formState, peopleSelection_visible: false }));

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

			setFormState(formState => ({ ...formState, peopleSelection_visible: false }));

			document.querySelectorAll('[data-menu-toggle]').forEach(input => input.setAttribute('data-menu-toggle', 'on'));
		}

		e.stopPropagation();
	}

	// If we set the checkin day above the checkout day
	const resetCalendar = () => {

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
		}
	}

	useEffect(() => displayMonthDays());

	useEffect(() => {

		resetCalendar();

	}, [formState.checkIn_day, formState.checkOut_day]);

	return (
		<FormContext.Provider value={{
			...formState,
			...date,
			displayForm,
			showCalendar,
			handleChange,
			formatCalendarMonth,
			selectDate,
			changeMonth,
			showPeopleSelection,
			closeFormMenus,
			selectPeople
		}}>
			{props.children}
		</FormContext.Provider>
	)
}

export default FormContextProvider;
