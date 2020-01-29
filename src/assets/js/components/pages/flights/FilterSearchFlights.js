import React, { useContext, useEffect, useState } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';
import { FormContext } from '../../../context/FormContext';

const FilterSearchFlights = () => {

	const { getImage, documentLoaded } = useContext(GlobalContext);
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

				setTimeout(() => document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'true')), 400);

			} else {

				filterContainer.classList.remove('filter-hidden');
				buttonIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');

				document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'false'));

				setTimeout(() => document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'true')), 400);
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

	const [value, setValue] = useState(undefined);
	const [rangePrice, setRangePrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

	useEffect(() => {

		setRangePrice(getMaxPrice());
		setMinPrice(getMinPrice());
		setMaxPrice(getMaxPrice());

	}, [defaultFiltered_flights]);

	/*

	How it works:

	When we initially submit on the checkin form, we add our flights db for both default filter and applied filter array.
	In the `FilterItemsFlights` component we always loop trough the applied filter array.

	When we apply a new filter from this component,
	we apply the default filter array (from checkin form search on the home page ) to the applied filter array.
	(So we always render / loop in the `FilterItemsFlights` component )

	So each time we set a filter we modify the appliedFilter array, not the default array (from checkin form)

	:)
	
	*/

	const initialFilterValue = {
		stops: undefined,
		ticketPrice: undefined
	};

	const [filterValue, setFilterValue] = useState(initialFilterValue);

	const applyFilter = e => {

		const inputType = e.target.getAttribute('type');
		const inputValue = parseFloat(e.target.value);
		const inputId = e.target.id;

		if (inputType === 'range') {
			setRangePrice(inputValue);

			setFilterValue(filterValue => ({...filterValue, ticketPrice: inputValue }));
		}

		inputType === 'radio' && setFilterValue(filterValue => ({...filterValue, stops: inputValue }));

		setValue(inputValue);

		// So we know we change the value
		// setFilterOn(true);
		// setTimeout(() => setFilterOn(false), 150);

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

		let dd = [...defaultFiltered_flights];

		if(filterValue.stops) dd = dd.filter(item => item.stops === filterValue.stops && item);

		if(filterValue.ticketPrice) dd = dd.filter(item => item.price <= filterValue.ticketPrice && item);

		setFilteredDatabase(dd, 'flights');
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
							<input id='one-stop' type='radio' name='stops' value='1' onChange={applyFilter} />
							<span></span>
							One stop
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='two-stops'>
							<input id='two-stops' type='radio' name='stops' value='2' onChange={applyFilter} />
							<span></span>
							Two stops
					</label>
					</div>
				</div>
			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Ticket Price</h3>
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

						<label htmlFor='time-interval-1'>
							<input id='time-interval-1' type='checkbox' name='time-interval' value='1' />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							00:00 - 22:00
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='time-interval-2'>
							<input id='time-interval-2' type='checkbox' name='time-interval' value='1' />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							04:00 - 16:00
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='time-interval-3'>
							<input id='time-interval-3' type='checkbox' name='time-interval' value='2' />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							08:00 - 20:00
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='time-interval-4'>
							<input id='time-interval-4' type='checkbox' name='time-interval' value='2' />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
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
						<label htmlFor='airlines-1'>
							<input id='airlines-1' type='checkbox' name='airlines' value='1' />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							Tarom
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='airlines-2'>
							<input id='airlines-2' type='checkbox' name='airlines' value='1' />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							United Airlines
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='airlines-3'>
							<input id='airlines-3' type='checkbox' name='airlines' value='2' />
							<span><img src={getImage('checkbox-icon.svg')} alt='checkbox-icon' /></span>
							Finnair
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='airlines-4'>
							<input id='airlines-4' type='checkbox' name='airlines' value='2' />
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
