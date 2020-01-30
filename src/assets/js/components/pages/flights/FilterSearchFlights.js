import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';
import { FormContext } from '../../../context/FormContext';

const FilterSearchFlights = () => {

	const { getImage } = useContext(GlobalContext);
	const {
		defaultFiltered_flights,
		appliedFiltered_flights,
		setFilteredDatabase
	} = useContext(FormContext);

	const toggleFilterMenu = e => {

		if (e.currentTarget.tagName === 'A' && e.currentTarget.dataset.eventToggle === 'true') {

			const filterContainer = e.currentTarget.parentElement.nextElementSibling;
			const buttonIcon = e.currentTarget.children[0];

			if (!filterContainer.classList.contains('filter-hidden')) {

				filterContainer.classList.add('filter-hidden');
				buttonIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');

				document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'false'));

				setTimeout(() => document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'true')), 350);

			} else {

				filterContainer.classList.remove('filter-hidden');
				buttonIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');

				document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'false'));

				setTimeout(() => document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'true')), 350);
			}
		}

		e.stopPropagation();
	}

	/*
		
		a => normally would be the accumulator ( initial value )
		b => the number we want to add to the accumulator

		To get the highest number:
		- We the highest number we add in accumulator ( b )
		- console.log(numbers.reduce((a, b) => b));

		To get the highest number:
		- We the lowest number we add in accumulator ( a )
		- console.log(numbers.reduce((a, b) => a));

	*/
	const getMaxPrice = () => appliedFiltered_flights.length !== 0 ? appliedFiltered_flights.map(item => item.price).reduce((a, b) => b) : 0;
	const getMinPrice = () => appliedFiltered_flights.length !== 0 ? appliedFiltered_flights.map(item => item.price).reduce((a, b) => a) : 0;

	const [rangePrice, setRangePrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

	useEffect(() => {

		setRangePrice(getMaxPrice());
		setMinPrice(getMinPrice());
		setMaxPrice(getMaxPrice());

	}, [defaultFiltered_flights]);

	const initialFilterValue = {
		stops: undefined,
		ticketPrice: undefined,
		departureInterval_start: undefined,
		departureInterval_end: undefined,
		airlines: {
			tarom: undefined,
			unitedAirlines: undefined,
			finnair: undefined,
			aeroflot: undefined
		}
	};

	const [filterValue, setFilterValue] = useState(initialFilterValue);

	const applyFilter = e => {

		const inputType = e.target.getAttribute('type');
		const inputValue_number = parseFloat(e.target.value);
		const inputValue_string = e.target.value;
		const inputId = e.target.id;
		const isChecked = e.target.checked;

		if (inputType === 'range') {
			setRangePrice(inputValue_number);

			setFilterValue(filterValue => ({ ...filterValue, ticketPrice: inputValue_number }));
		}

		if (inputType === 'radio') {

			inputId.toLowerCase().includes('stop') && setFilterValue(filterValue => ({ ...filterValue, stops: inputValue_number }));


			if (inputId.toLowerCase().includes('departure-interval')) {

				const departureInterval_start = parseFloat(e.target.value.slice(0, 5));
				const departureInterval_end = parseFloat(e.target.value.slice(6, e.target.value.length));

				setFilterValue(filterValue => ({
					...filterValue,
					departureInterval_start: departureInterval_start,
					departureInterval_end: departureInterval_end
				}));
			}
		}

		if (inputType === 'checkbox') {

			isChecked && setFilterValue(filterValue => ({ ...filterValue, airlines: { ...filterValue.airlines, [inputValue_string]: inputValue_string } }));

			!isChecked && setFilterValue(filterValue => ({ ...filterValue, airlines: { ...filterValue.airlines, [inputValue_string]: undefined } }));
		}


		e.stopPropagation();
	}

	// const resetFilter = e => {

	// 	const filterType = e.target.dataset.filterType;

	// 	if (filterType === 'stops') {

	// 		document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
	// 		setFilteredDatabase(defaultFiltered_flights, 'flights');
	// 	}

	// 	e.stopPropagation();
	// }

	const displayFlights = () => {

		let appliedFilter = [...defaultFiltered_flights];

		// If we have more than 1 checkbox input active we use these 2 arrays
		let checkboxArr = [];
		let newArr = [];

		// Add the flights with the specific airline company to the checkBox arr, but use the default array, not the array with another filters active
		if (filterValue.airlines.tarom) {

			appliedFilter = defaultFiltered_flights.filter(item => item.airlines.toLowerCase() === filterValue.airlines.tarom);

			checkboxArr.push(appliedFilter);
		}

		if (filterValue.airlines.unitedAirlines) {

			appliedFilter = defaultFiltered_flights.filter(item => {

				if (/ /g.test(item.airlines)) {

					// In json api `database` is: "United Airlines"
					item.airlines.replace(' ', '');

					item.airlines.toLowerCase() === filterValue.airlines.unitedAirlines;

					return item;
				}
			});

			checkboxArr.push(appliedFilter);
		}

		if (filterValue.airlines.finnair) {

			appliedFilter = defaultFiltered_flights.filter(item => item.airlines.toLowerCase() === filterValue.airlines.finnair);

			checkboxArr.push(appliedFilter);
		}

		if (filterValue.airlines.aeroflot) {

			appliedFilter = defaultFiltered_flights.filter(item => item.airlines.toLowerCase() === filterValue.airlines.aeroflot);

			checkboxArr.push(appliedFilter);
		}

		// We need to make the items objects to be in one single array
		checkboxArr.forEach(item => item.forEach(obj => newArr.push(obj)));

		// Here we check how manny checkbox inputs are active (checked)
		const multipleCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"]')).filter(input => input.checked);

		// If there are more than 1 airline company filter active, we apply the filters to the array with items objects that have multiple airline companies
		if (multipleCheckbox.length > 1) appliedFilter = [...newArr];

		if (filterValue.stops) appliedFilter = appliedFilter.filter(item => item.stops === filterValue.stops);

		if (filterValue.ticketPrice) appliedFilter = appliedFilter.filter(item => item.price <= filterValue.ticketPrice);

		if (filterValue.departureInterval_start) appliedFilter = appliedFilter.filter(item => item.intervalStart === filterValue.departureInterval_start);

		if (filterValue.departureInterval_end) appliedFilter = appliedFilter.filter(item => item.intervalEnd === filterValue.departureInterval_end);

		setFilteredDatabase(appliedFilter, 'flights');
	}

	useEffect(() => {

		displayFlights();

	}, [filterValue]);

	return (
		<div id="filter-search-flights">

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Stops</h3>
					<a aria-label='button' data-filter-type='stops'  >Clear</a>

					<a aria-label='button' data-event-toggle='true' onClick={toggleFilterMenu}><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">
					<div className="filter-search-inputs">

						<label htmlFor='one-stop'>
							<input id='one-stop' type='radio' name='stops' defaultValue='1' onChange={applyFilter} />
							<span></span>
							One stop
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='two-stops'>
							<input id='two-stops' type='radio' name='stops' defaultValue='2' onChange={applyFilter} />
							<span></span>
							Two stops
					</label>
					</div>
				</div>
			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Ticket Price <span className='description'>(for 1 ticket)</span></h3>
					<a aria-label='button'>Clear</a>

					<a aria-label='button' onClick={toggleFilterMenu} data-event-toggle='true'><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">
					<div className="filter-search-inputs">
						<input className='mr-1 py-1' id='ticket-price' name='ticket-price' type='range' min={minPrice} max={maxPrice} value={rangePrice} onChange={applyFilter} />
						<label htmlFor='ticket-price'>$ {rangePrice}</label>
					</div>
				</div>
			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Departure Time</h3>
					<a aria-label='button'>Clear</a>

					<a aria-label='button' data-event-toggle='true' onClick={toggleFilterMenu}><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">
					<div className="filter-search-inputs">

						<label htmlFor='departure-interval-1'>
							<input id='departure-interval-1' type='radio' defaultValue='00:00-22:00' name='departure-interval' onChange={applyFilter} />
							<span></span>
							00:00 - 22:00
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='departure-interval-2'>
							<input id='departure-interval-2' type='radio' defaultValue='04:00-16:00' name='departure-interval' onChange={applyFilter} />
							<span></span>
							04:00 - 16:00
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='departure-interval-3'>
							<input id='departure-interval-3' type='radio' defaultValue='08:00-20:00' name='departure-interval' onChange={applyFilter} />
							<span></span>
							08:00 - 20:00
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='departure-interval-4'>
							<input id='departure-interval-4' type='radio' defaultValue='12:00-00:00' name='departure-interval' onChange={applyFilter} />
							<span></span>
							12:00 - 00:00
						</label>
					</div>
				</div>

			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Airlines</h3>
					<a aria-label='button'>Clear</a>

					<a aria-label='button' data-event-toggle='true' onClick={toggleFilterMenu}><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">
					<div className="filter-search-inputs">
						<label htmlFor='tarom-airlines'>
							<input id='tarom-airlines' type='checkbox' name='airlines' defaultValue='tarom' onChange={applyFilter} />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							Tarom
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='united-airlines'>
							<input id='united-airlines' type='checkbox' name='airlines' defaultValue='unitedAirlines' onChange={applyFilter} />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							United Airlines
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='finnair-airlines'>
							<input id='finnair-airlines' type='checkbox' name='airlines' defaultValue='finnair' onChange={applyFilter} />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							Finnair
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='aeroflot-airlines'>
							<input id='aeroflot-airlines' type='checkbox' name='airlines' defaultValue='aeroflot' onChange={applyFilter} />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							Aeroflot
					</label>
					</div>
				</div>

			</div>

		</div>
	)
}

export default FilterSearchFlights
