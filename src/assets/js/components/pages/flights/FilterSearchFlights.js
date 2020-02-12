import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';
import { FormContext } from '../../../context/FormContext';

const FilterSearchFlights = () => {

	const { getImage } = useContext(GlobalContext);
	const {
		peopleTotal,
		defaultFiltered_flights,
		setFilteredDatabase,
		appliedFiltered_flights,
		enableLoading
	} = useContext(FormContext);

	const toggleFilterMenu = e => {

		console.log(e.currentTarget);

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
	const getMaxPrice = () => appliedFiltered_flights.length !== 0 ? peopleTotal * appliedFiltered_flights.map(item => item.price).sort((a, b) => a - b).reduce((a, b) => b) : 0;
	const getMinPrice = () => appliedFiltered_flights.length !== 0 ? peopleTotal * appliedFiltered_flights.map(item => item.price).sort((a, b) => a - b).reduce((a, b) => a) : 0;

	const [rangePrice, setRangePrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

	useEffect(() => {

		setRangePrice(getMaxPrice());
		setMinPrice(getMinPrice());
		setMaxPrice(getMaxPrice());

	}, [defaultFiltered_flights]);

	const defaultFilterState = {
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

	const [filterState, setFilterState] = useState(defaultFilterState);

	const applyFilter = e => {

		enableLoading('filterLoader');

		const inputType = e.target.getAttribute('type');
		const inputValue_number = parseFloat(e.target.value);
		const inputValue_string = e.target.value;
		const inputId = e.target.id;
		const isChecked = e.target.checked;

		if (inputType === 'range') {
			setRangePrice(inputValue_number);

			setFilterState(filterState => ({ ...filterState, ticketPrice: inputValue_number }));
		}

		if (inputType === 'radio') {

			inputId.toLowerCase().includes('stop') && setFilterState(filterState => ({ ...filterState, stops: inputValue_number }));


			if (inputId.toLowerCase().includes('departure-interval')) {

				const departureInterval_start = parseFloat(e.target.value.slice(0, 5));
				const departureInterval_end = parseFloat(e.target.value.slice(6, e.target.value.length));

				setFilterState(filterState => ({
					...filterState,
					departureInterval_start: departureInterval_start,
					departureInterval_end: departureInterval_end
				}));
			}
		}

		if (inputType === 'checkbox') {

			isChecked && setFilterState(filterState => ({ ...filterState, airlines: { ...filterState.airlines, [inputValue_string]: inputValue_string } }));

			!isChecked && setFilterState(filterState => ({ ...filterState, airlines: { ...filterState.airlines, [inputValue_string]: undefined } }));
		}

		e.stopPropagation();
	}

	const clearFiltersIndividual = e => {

		const resetType = e.target.dataset.resetFilter;

		enableLoading('filterLoader');

		if (resetType === 'stops') {

			setFilterState(filterState => ({
				...filterState,
				stops: undefined
			}));

			document.querySelectorAll('input[name="stops"]').forEach(input => input.checked = false);
		}

		if (resetType === 'ticketPrice') {

			setFilterState(filterState => ({ ...filterState, ticketPrice: undefined }));

			setRangePrice(getMaxPrice());
		}

		if (resetType === 'interval') {
			setFilterState(filterState => ({
				...filterState,
				departureInterval_start: undefined,
				departureInterval_end: undefined
			}));

			document.querySelectorAll('input[name="departure-interval"]').forEach(input => input.checked = false);
		}

		if (resetType === 'airlines') {

			setFilterState(filterState => ({
				...filterState,
				airlines: {
					tarom: undefined,
					unitedAirlines: undefined,
					finnair: undefined,
					aeroflot: undefined
				}
			}));

			document.querySelectorAll('input[name="airlines"]').forEach(input => input.checked = false);
		}

		if (resetType === 'clear-all') {

			clearFiltersMultiple();
		}

		e.stopPropagation();
	}

	// DRY
	const clearFiltersMultiple = () => {

		setFilterState(defaultFilterState);

		setRangePrice(getMaxPrice());

		document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
		document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
	}

	const displayFlights = () => {

		let appliedFilter = [...defaultFiltered_flights];
		let airlineCompanyCheckbox = false;

		// If any airline company is selected
		Object.values(filterState.airlines).forEach(checkbox => { if (checkbox !== undefined) airlineCompanyCheckbox = true });

		// Add the flights with the specific airline company to the checkBox arr, but use the default array, not the array with applied filters
		if (airlineCompanyCheckbox) {

			appliedFilter = appliedFilter.filter(item => {

				if (item.airlines.toLowerCase() === filterState.airlines.tarom) return item;

				// In json api `database` is: "United Airlines"
				if (filterState.airlines.unitedAirlines !== undefined) {


					if (item.airlines.replace(' ', '').toLowerCase() === filterState.airlines.unitedAirlines.toLowerCase()) return item;
				}

				if (item.airlines.toLowerCase() === filterState.airlines.finnair) return item;

				if (item.airlines.toLowerCase() === filterState.airlines.aeroflot) return item;
			});
		}

		if (filterState.stops) appliedFilter = appliedFilter.filter(item => item.stops === filterState.stops);

		if (filterState.ticketPrice) appliedFilter = appliedFilter.filter(item => peopleTotal * item.price <= filterState.ticketPrice);

		if (filterState.departureInterval_start) appliedFilter = appliedFilter.filter(item => item.intervalStart === filterState.departureInterval_start);

		if (filterState.departureInterval_end) appliedFilter = appliedFilter.filter(item => item.intervalEnd === filterState.departureInterval_end);

		// So we get unique values
		appliedFilter = appliedFilter.filter((item, index) => appliedFilter.indexOf(item) === index);

		setFilteredDatabase(appliedFilter, 'flights');
	}

	useEffect(() => {

		displayFlights();

	}, [filterState]);

	useEffect(() => {

		clearFiltersMultiple();

	}, [defaultFiltered_flights]);

	return (
		<div id="filter-search-flights">

			<div className="filter-search-box">
				<div className="filter-search-header">
					<p>{appliedFiltered_flights.length} {appliedFiltered_flights.length === 1 ? 'flight' : 'flights'} found</p>
				</div>
			</div>

			<div className="filter-search-box">
				<div className="filter-search-header">
					<h3 className="heading">Filters</h3>
					{
						filterState.stops ||
							filterState.ticketPrice ||
							filterState.departureInterval_start ||
							filterState.departureInterval_end ||
							filterState.airlines.tarom ||
							filterState.airlines.unitedAirlines ||
							filterState.airlines.finnair ||
							filterState.airlines.aeroflot ? <a aria-label='button' data-reset-filter='clear-all' onClick={clearFiltersIndividual} >Clear all</a> : false
					}
				</div>
			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Stops</h3>
					{filterState.stops && <a aria-label='button' data-reset-filter='stops' onClick={clearFiltersIndividual} >Clear</a>}

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
					<h3 className='heading mr-1'>Total Ticket Price</h3>
					{filterState.ticketPrice && <a aria-label='button' data-reset-filter='ticketPrice' onClick={clearFiltersIndividual}>Clear</a>}

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
					{
						filterState.departureInterval_start ||
							filterState.departureInterval_end ? <a aria-label='button' data-reset-filter='interval' onClick={clearFiltersIndividual}>Clear</a> : false}

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
					{
						filterState.airlines.tarom ||
							filterState.airlines.unitedAirlines ||
							filterState.airlines.finnair ||
							filterState.airlines.aeroflot ? <a aria-label='button' data-reset-filter='airlines' onClick={clearFiltersIndividual}>Clear</a> : false
					}

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
