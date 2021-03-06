import React, {

	useContext, 
	useEffect, 
	useState
	
 } from 'react';

import { FormContext } from '@context/FormContext';

import Image from '@components/global_layout/Image';

const FilterSearchHotels = () => {

	const {

		peopleTotal,
		defaultFiltered_hotels,
		setFilteredDatabase,
		appliedFiltered_hotels,
		enableLoading

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
	const getMaxPrice = () => appliedFiltered_hotels.length !== 0 ? peopleTotal * appliedFiltered_hotels.map(hotel => hotel.price).sort((a, b) => a - b).reduce((a, b) => b) : 0;

	const getMinPrice = () => appliedFiltered_hotels.length !== 0 ? peopleTotal * appliedFiltered_hotels.map(hotel => hotel.price).sort((a, b) => a - b).reduce((a, b) => a) : 0;

	const [rangePrice, setRangePrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

	useEffect(() => {

		setRangePrice(getMaxPrice());
		setMinPrice(getMinPrice());
		setMaxPrice(getMaxPrice());

	}, [defaultFiltered_hotels]);

	const defaultFilterState = {
		roomPrice: undefined,
		roomType: {
			hotel: undefined,
			resort: undefined,
			suite: undefined,
			villa: undefined
		},
		roomFeedback: {
			1: undefined,
			2: undefined,
			3: undefined,
			4: undefined,
			5: undefined
		}
	};

	const [filterState, setFilterState] = useState(defaultFilterState);

	const applyFilter = e => {

		enableLoading('filterLoader');

		const inputType = e.target.getAttribute('type');
		const inputValue_number = parseFloat(e.target.value);
		const inputValue_string = e.target.value.toLowerCase();
		const isChecked = e.target.checked;

		if (inputType === 'range') {
			setRangePrice(inputValue_number);

			setFilterState(filterState => ({
				...filterState,
				roomPrice: inputValue_number
			}));
		}

		if (inputType === 'checkbox') {

			if (e.target.name === 'property-type') {

				isChecked && setFilterState(filterState => ({
					...filterState,
					roomType: {
						...filterState.roomType,
						[inputValue_string]: inputValue_string
					}
				}));

				!isChecked && setFilterState(filterState => ({
					...filterState,
					roomType: {
						...filterState.roomType,
						[inputValue_string]: undefined
					}
				}));
			}

			if (e.target.name === 'room-feedback') {

				isChecked && setFilterState(filterState => ({
					...filterState,
					roomFeedback: {
						...filterState.roomFeedback,
						[inputValue_number]: inputValue_number
					}
				}));

				!isChecked && setFilterState(filterState => ({
					...filterState,
					roomFeedback: {
						...filterState.roomFeedback,
						[inputValue_number]: undefined
					}
				}));
			}
		}

		e.stopPropagation();
	}

	const clearFiltersIndividual = e => {

		const resetType = e.target.dataset.resetFilter;

		enableLoading('filterLoader');

		if (resetType === 'room-price') {

			setFilterState(filterState => ({ ...filterState, roomPrice: undefined }));

			setRangePrice(maxPrice);
		}

		if (resetType === 'room-feedback') {
			setFilterState(filterState => ({
				...filterState,
				roomFeedback: {
					1: undefined,
					2: undefined,
					3: undefined,
					4: undefined,
					5: undefined
				}
			}));

			document.querySelectorAll('input[name="room-feedback"]').forEach(input => input.checked = false);
		}

		if (resetType === 'property-type') {

			setFilterState(filterState => ({
				...filterState,
				roomType: {
					hotel: undefined,
					resort: undefined,
					suite: undefined,
					villa: undefined
				},
			}));

			document.querySelectorAll('input[name="property-type"]').forEach(input => input.checked = false);
		}

		if (resetType === 'clear-all') {

			clearFiltersMultiple();

			setRangePrice(maxPrice);
		}

		e.stopPropagation();
	}

	// DRY
	const clearFiltersMultiple = () => {

		setFilterState(defaultFilterState);

		document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
		document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
	}

	const displayHotels = () => {

		let appliedFilter = [...defaultFiltered_hotels];

		let feedbackCheckbox = false;
		let propertyTypeCheckbox = false;

		// Here we check how manny checkbox inputs are active (checked)
		Object.values(filterState.roomType).forEach(check => { if (check !== undefined) propertyTypeCheckbox = true });
		Object.values(filterState.roomFeedback).forEach(check => { if (check !== undefined) feedbackCheckbox = true });

		if (feedbackCheckbox) {

			appliedFilter = appliedFilter.filter(hotel => {

				if (hotel.roomFeedback === filterState.roomFeedback[1]) return hotel;

				if (hotel.roomFeedback === filterState.roomFeedback[2]) return hotel;

				if (hotel.roomFeedback === filterState.roomFeedback[3]) return hotel;

				if (hotel.roomFeedback === filterState.roomFeedback[4]) return hotel;

				if (hotel.roomFeedback === filterState.roomFeedback[5]) return hotel;
			});
		}

		if (propertyTypeCheckbox) {

			appliedFilter = appliedFilter.filter(hotel => {

				if (hotel.roomType.toLowerCase() === filterState.roomType.hotel) return hotel;

				if (hotel.roomType.toLowerCase() === filterState.roomType.resort) return hotel;

				if (hotel.roomType.toLowerCase() === filterState.roomType.suite) return hotel;

				if (hotel.roomType.toLowerCase() === filterState.roomType.villa) return hotel;
			});
		}

		appliedFilter = appliedFilter.filter((item, index) => appliedFilter.indexOf(item) === index);

		if (filterState.roomPrice) appliedFilter = appliedFilter.filter(hotel => peopleTotal * hotel.price <= filterState.roomPrice);

		setFilteredDatabase(appliedFilter, 'hotels');
	}

	useEffect(() => {

		displayHotels();

	}, [filterState]);

	useEffect(() => {

		setRangePrice(getMaxPrice());

		clearFiltersMultiple();

	}, [defaultFiltered_hotels]);

	return (
		<div id='filter-search-hotels'>

			<div className="filter-search-box">
				<div className="filter-search-header">
					<p>{appliedFiltered_hotels.length} {appliedFiltered_hotels.length === 1 ? 'room' : 'rooms'} found</p>
				</div>
			</div>

			<div className="filter-search-box">
				<div className="filter-search-header">
					<h3 className="heading">Filters</h3>
					{

						filterState.roomPrice < maxPrice ||
							filterState.roomType.hotel ||
							filterState.roomType.resort ||
							filterState.roomType.suite ||
							filterState.roomType.villa ||
							filterState.roomFeedback[1] ||
							filterState.roomFeedback[2] ||
							filterState.roomFeedback[3] ||
							filterState.roomFeedback[4] ||
							filterState.roomFeedback[5] ? < a aria-label='button' data-reset-filter='clear-all' onClick={clearFiltersIndividual} >Clear all</a> : false
					}
				</div>
			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Room feedback</h3>

					{
						filterState.roomFeedback[1] ||
							filterState.roomFeedback[2] ||
							filterState.roomFeedback[3] ||
							filterState.roomFeedback[4] ||
							filterState.roomFeedback[5] ? <a aria-label='button' data-reset-filter='room-feedback' onClick={clearFiltersIndividual}>Clear</a> : false
					}

					<a aria-label='button' data-event-toggle='true' onClick={toggleFilterMenu}><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">

					<div className="filter-search-inputs">

						<label htmlFor='5-stars'>
							<input id='5-stars' type='checkbox' name='room-feedback' defaultValue='5' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='4-stars'>
							<input id='4-stars' type='checkbox' name='room-feedback' defaultValue='4' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='3-stars'>
							<input id='3-stars' type='checkbox' name='room-feedback' defaultValue='3' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
						</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='2-stars'>
							<input id='2-stars' type='checkbox' name='room-feedback' defaultValue='2' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
						</label>
					</div>

					<div className="filter-search-inputs">
						<label htmlFor='1-star'>
							<input id='1-star' type='checkbox' name='room-feedback' defaultValue='1' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							<i className="fas fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
							<i className="far fa-star" aria-hidden="true"></i>
						</label>
					</div>
				</div>
			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Property Type</h3>

					{
						filterState.roomType.hotel ||
							filterState.roomType.resort ||
							filterState.roomType.suite ||
							filterState.roomType.villa ? <a aria-label='button' data-reset-filter='property-type' onClick={clearFiltersIndividual}>Clear</a> : false
					}

					<a aria-label='button' data-event-toggle='true' onClick={toggleFilterMenu}><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">
					<div className="filter-search-inputs">
						<label htmlFor='hotel'>
							<input id='hotel' type='checkbox' name='property-type' defaultValue='hotel' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							Hotel
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='resort'>
							<input id='resort' type='checkbox' name='property-type' defaultValue='resort' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							Resort
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='suite'>
							<input id='suite' type='checkbox' name='property-type' defaultValue='suite' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							Suite
					</label>
					</div>

					<div className="filter-search-inputs">

						<label htmlFor='villa'>
							<input id='villa' type='checkbox' name='property-type' defaultValue='villa' onChange={applyFilter} />
							<span><Image src='checkbox-icon.svg' /></span>
							Villa
					</label>
					</div>
				</div>

			</div>

			<div className="filter-search-box">

				<div className="filter-search-header">
					<h3 className='heading mr-1'>Price per night</h3>
					{filterState.roomPrice < maxPrice && <a aria-label='button' data-reset-filter='room-price' onClick={clearFiltersIndividual}>Clear</a>}

					<a aria-label='button' onClick={toggleFilterMenu} data-event-toggle='true'><i className="fas fa-chevron-up"></i></a>
				</div>

				<div className="filter-search-container">
					<div className="filter-search-inputs">
						<input className='mr-1 py-1' id='room-price' name='room-price' type='range' min={minPrice} max={maxPrice} value={rangePrice} onChange={applyFilter} />
						<label className='disabled-label' htmlFor='room-price'>$ {rangePrice}</label>
					</div>
				</div>
			</div>

		</div >
	)
}

export default FilterSearchHotels;