import React from 'react';
import PropTypes from 'prop-types';

const Calendar = ({ formatCalendarMonth, weekdayName, selectDate, changeMonth }) => {
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

Calendar.propTypes = {
	formatCalendarMonth: PropTypes.func.isRequired,
	weekdayName: PropTypes.array.isRequired,
	selectDate: PropTypes.func.isRequired,
	changeMonth: PropTypes.func.isRequired
}

export default Calendar;
