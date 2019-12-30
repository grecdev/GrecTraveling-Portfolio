import React, { useContext } from 'react';

import { GlobalContext } from '../../../../context/global/GlobalContext';

const CheckinForm = () => {

	const { getImage } = useContext(GlobalContext);

	console.log()

	return (
		<div id='checkin-form'>
			<form name='checkin-form' className='p-1'>

				<div className="form-box">
					<label htmlFor="from">Flying from:</label>
					<input type="text" id='from' placeholder='Location' name='flying-from' />
				</div>

				<div className="form-box">
					<label htmlFor="to">To:</label>
					<input type="text" id='to' placeholder='Location' name='flying-to' />
				</div>

				<div className="form-box">
					<label htmlFor="departing">Departing:</label>
					<input type="text" id='departing' placeholder='MM / DD / YY' name='departing' />
				</div>

				<div className="form-box">
					<label htmlFor="returning">Returning:</label>
					<input type="text" id='returning' placeholder='MM / DD / YY' name='returning' />
				</div>

				<div className="form-box">
					<label htmlFor="passengers">Passengers:</label>
					<input type="text" id='passengers' value={1} readOnly name='passengers' />
				</div>

				<button type='submit'><i className="fas fa-search"></i></button>
			</form>
		</div>
	)
}

export default CheckinForm;
