import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

const SectionHeader = ({ image, title }) => {

	return (
		<div className="section-header text-center">
			<h3 className='mb-1 heading-1'>{title}</h3>

			<div className="section-header-logo mb-1">
				<Image src={image} />
			</div>
		</div>
	)
}

SectionHeader.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
}

export default SectionHeader;
