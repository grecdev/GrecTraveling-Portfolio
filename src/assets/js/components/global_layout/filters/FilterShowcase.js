import React from 'react';
import PropTypes from 'prop-types';

import CheckinForm from '../checkin_form/CheckinForm';

const FilterShowcase = ({ text, type, flights, hotels }) => {
	return (
		<section id='filters-showcase' className={`${type} overlay overlay-normal`}>
			<div className="filters-showcase-container">
				<h1 className='heading heading-2 mb-2'>{text}</h1>

				<CheckinForm flights={flights} hotels={hotels} multiple={false} />
			</div>
		</section>
	)
}

FilterShowcase.propTypes = {
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired
}

export default FilterShowcase;
