import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from '../SectionHeader';

const FilterEmpty = ({ flights, hotels }) => {

	return (
		<>
			{
				flights && (
					<section id="filters-empty-wrapper" className='p-2'>

						<SectionHeader title={'How to search for flights'} image={'section-header-logo-blue.svg'} />

						<div className="filters-empty-container">

							<div className="filters-empty-box p-1 text-center">

								<h3 className='heading mb-1'>Location</h3>
								<p className='mb-1 description'>Location is optional, but you can search for both input fields ( from / to )</p>
								<p>Locations available:</p>
								<ul>
									<li>1. Dubai</li>
									<li>2. New York</li>
									<li>3. Amsterdam</li>
									<li>4. Thailand</li>
								</ul>

							</div>

							<div className="filters-empty-box p-1 text-center">

								<h3 className='heading mb-1'>Departing / Returning</h3>
								<p className='mb-1 description'>The datepicker filters the flights only for months.</p>
								<p>Months available:</p>
								<ul>
									<li>1. January</li>
									<li>2. February</li>
									<li>3. March</li>
									<li>4. April</li>
								</ul>

							</div>

							<div className="filters-empty-box p-1 text-center">

								<h3 className='heading mb-1'>Passengers</h3>
								<p className='mb-1 description'>The flight price is multiplied by the number of passengers</p>
								<p>Maximum of 4 passengers available</p>

							</div>

						</div>

					</section>
				)
			}

			{
				hotels && (
					<section id="filters-empty-wrapper" className='p-2'>

						<SectionHeader title={'How to search for hotels'} image={'section-header-logo-blue.svg'} />

						<div className="filters-empty-container">

							<div className="filters-empty-box p-1 text-center">

							</div>

							<div className="filters-empty-box p-1 text-center">

							</div>

							<div className="filters-empty-box p-1 text-center">

							</div>

						</div>

					</section>
				)
			}
		</>
	)
}

FilterEmpty.propTypes = {
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired
}

export default FilterEmpty;
