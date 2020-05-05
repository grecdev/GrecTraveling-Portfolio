import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from '../SectionHeader';

const FilterEmpty = ({ flights, hotels }) => {

	return (
		<section id="filters-empty-wrapper" className='p-2'>

			<SectionHeader title={'How to search for hotels'} image={'section-header-logo-blue.svg'} />

			<div className="filters-empty-container">

				<div className="filters-empty-box p-1 text-center">

					<h3 className='heading mb-1'>Location</h3>
					<p className='mb-1 description'>{hotels ? "City or Country" : "Flying From"} input is optional ( disabled in the .js file )</p>

					<p className='mb-1'>Locations available:</p>
					<ul>
						<li>Dubai</li>
						<li>New York</li>
						<li>Amsterdam</li>
						<li>Thailand</li>
					</ul>

				</div>

				<div className="filters-empty-box p-1 text-center">

					<h3 className='heading mb-1'>{hotels ? 'Check-in / Check-out' : "Departing / Returning"}</h3>
					<p className='mb-1 description'>The datepicker filters the {hotels ? 'hotels' : 'flights'} only for months.</p>
					<p className='mb-1'>Months available:</p>
					<ul>
						<li>May</li>
						<li>June</li>
						<li>July</li>
						<li>August</li>
					</ul>

				</div>

				<div className="filters-empty-box p-1 text-center">
					<h3 className='heading mb-1'>{hotels ? 'People' : 'Passengers'}</h3>
					<p className='mb-1 description'>The {hotels ? 'hotel room' : 'flight'} price is multiplied by the number of {hotels ? 'people' : 'passengers'}</p>
					<p>Maximum of 4 {hotels ? 'people' : 'passengers'} available</p>
				</div>
			</div>
		</section>
	)
}

FilterEmpty.propTypes = {
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired
}

export default FilterEmpty;
