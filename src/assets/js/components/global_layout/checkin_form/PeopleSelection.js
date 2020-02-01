import React, { useContext } from 'react';

import PeopleSelectionAlert from './PeopleSelectionAlert';

import { FormContext } from '../../../context/FormContext';

const PeopleSelection = () => {

	const {
		selectPeople,
		peopleTotal,
		adults,
		youth,
		children,
		infants
	} = useContext(FormContext);
	
	const style = {
		colorPink: '#e2076a', // $primary-pink
		colorBlue: '#64a5f8' // $primary-blue
	}

	return (
		<div className='people-selection p-1' onClick={selectPeople} style={{
			boxShadow: `0 0 10px 2px ${peopleTotal === 0 ? style.colorPink : style.colorBlue}`
		}}>

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
					<a aria-label='button' className="btn btn-blue  increment-people" style={{backgroundColor: peopleTotal === 0 && style.colorPink}}><i className="fas fa-plus"></i></a>
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
					<a aria-label='button' className="btn btn-blue  increment-people" style={{ backgroundColor: peopleTotal === 0 && style.colorPink }}><i className="fas fa-plus"></i></a>
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
					<a aria-label='button' className="btn btn-blue  increment-people" style={{ backgroundColor: peopleTotal === 0 && style.colorPink }}><i className="fas fa-plus"></i></a>
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
					<a aria-label='button' className="btn btn-blue  increment-people" style={{ backgroundColor: peopleTotal === 0 && style.colorPink }}><i className="fas fa-plus"></i></a>
				</div>
			</div>

			<button type='button' style={{ backgroundColor: peopleTotal === 0 && style.colorPink }} className='btn btn-blue display-block mb-1'>Ready</button>
			
			{peopleTotal === 0 && <PeopleSelectionAlert text='You need to select at least 1 passenger' /> }
		</div>
	)
}

export default PeopleSelection;
