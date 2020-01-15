import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../context/GlobalContext';

const SectionHeader = ({ image, title }) => {

	const { getImage } = useContext(GlobalContext);

	return (
		<div className="section-header text-center">
			<h3 className='mb-1 heading-1'>{title}</h3>

			<div className="section-header-logo mb-1"><img src={getImage(image)} alt='section header logo' /></div>
		</div>
	)
}

SectionHeader.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
}

export default SectionHeader;
