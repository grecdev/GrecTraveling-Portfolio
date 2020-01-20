import React, { useContext } from 'react';

import { FormContext } from '../../../context/FormContext';

const PeopleSelection = () => {

	const {
		selectPeople,
		adults,
		youth,
		children,
		infants
	} = useContext(FormContext);

	return (
		<div className='people-selection p-1' onClick={selectPeople}>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Adults</h3>
					<p className='description'>over 18 years old</p>
				</div>

				<div className="people-selection-buttons">
					<a aria-label='button' className={
						`btn btn-blue decrement-people ${adults > 0 ? '' : 'people-btn-disabled'}`
					}><i className="fas fa-minus"></i></a>
					<span id='adults'>{adults}</span>
					<a aria-label='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></a>
				</div>
			</div>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Youth</h3>
					<p className='description'>between 12 and 18 years</p>
				</div>

				<div className="people-selection-buttons">
					<a aria-label='button' className={
						`btn btn-blue decrement-people ${youth > 0 ? '' : 'people-btn-disabled'}`
					}><i className="fas fa-minus"></i></a>
					<span id='youth'>{youth}</span>
					<a aria-label='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></a>
				</div>
			</div>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Children</h3>
					<p className='description'>between 2 and 12 years</p>
				</div>

				<div className="people-selection-buttons">
					<a aria-label='button' className={
						`btn btn-blue decrement-people ${children > 0 ? '' : 'people-btn-disabled'}`
					}><i className="fas fa-minus"></i></a>
					<span id='children'>{children}</span>
					<a aria-label='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></a>
				</div>
			</div>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Infants</h3>
					<p className='description'>up to 2 years old</p>
				</div>

				<div className="people-selection-buttons">
					<a aria-label='button' className={
						`btn btn-blue decrement-people ${infants > 0 ? '' : 'people-btn-disabled'}`
					}><i className="fas fa-minus"></i></a>
					<span id='infants'>{infants}</span>
					<a aria-label='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></a>
				</div>
			</div>

			<button type='button' className='btn btn-blue display-block'>Ready</button>
		</div>
	)
}

export default PeopleSelection;