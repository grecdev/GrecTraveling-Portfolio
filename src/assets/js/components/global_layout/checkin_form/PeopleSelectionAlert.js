import React from 'react';
import PropTypes from 'prop-types';

const PeopleSelectionAlert = ({text}) => {

	return (
		<div className='people-alert text-center p-1'>{text}</div>
	);
};

PeopleSelectionAlert.propTypes = {
	text: PropTypes.string.isRequired
}

export default PeopleSelectionAlert;