import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalContext';

const FilterSearchFlights = () => {

	const { getImage } = useContext(GlobalContext);

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

	return (
		<div id="filter-search-flights">

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Stops</h3>
					<a aria-label='button'>Clear</a>

					<a aria-label='button' data-event-toggle='true' onClick={toggleFilterMenu}><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">
					<div className="filter-search-inputs">

						<label htmlFor='one-stop'>
							<input id='one-stop' type='radio' name='stops' value='1' />
							<span></span>
							One stop
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='two-stops'>
							<input id='two-stops' type='radio' name='stops' value='2' />
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
						<input className='mr-1 py-1' id='ticket-price' type='range' min='1' max='100' name='ticket-price' defaultValue='50' />
						<label htmlFor='ticket-price'>$ 300</label>
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
