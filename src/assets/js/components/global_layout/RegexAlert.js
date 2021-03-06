import React from 'react';
import PropTypes from 'prop-types';

const RegexAlert = ({ text }) => {
	return (
		<div className={`regex-alert text-center ${text.includes('successfully') ? 'regex-success' : ''}`}>
			<p>{text}</p>
		</div>
	)
};

RegexAlert.propTypes = {
	text: PropTypes.string.isRequired
}

export default RegexAlert;
