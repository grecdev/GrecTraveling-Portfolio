import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { FormContext } from '../../../context/FormContext';

const Calendar = () => {

	const {formatCalendarMonth, weekdayName, selectDate, changeMonth} = useContext(FormContext);
	
	return (
		<div className="checkin-calendar">
			<div className='calendar-triangle'></div>

			<div className="calendar-month">
				<button type='button' className="decrement-month calendar-arrow" onClick={changeMonth}><i className="far fa-arrow-alt-circle-left"></i></button>
				<p className='date-name mx-1 text-center'>{formatCalendarMonth()}</p>
				<button type='button' className="increment-month calendar-arrow" onClick={changeMonth}><i className="far fa-arrow-alt-circle-right"></i></button>
			</div>

			<div className='table'>
				<div className='table-head'>
					<div className='table-row'>
						{weekdayName.map((day, index) => <div className='table-cell' key={index + 1}>{day}</div>)}
					</div>
				</div>
				<div className='table-body' onClick={selectDate}>
				</div>
			</div>
		</div>
	)
}


export default Calendar;
