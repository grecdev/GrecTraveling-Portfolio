import React from 'react';

const PeopleSelection = () => {
	return (
		<div className='people-selection p-1'>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Adults</h3>
					<p className='description'>over 18 years old</p>
				</div>

				<div className="people-selection-buttons">
					<button type='button' className="btn btn-blue decrement-people"><i className="fas fa-minus"></i></button>
					<span className='adults'>1</span>
					<button type='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></button>
				</div>
			</div>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Youth</h3>
					<p className='description'>between 12 and 18 years</p>
				</div>

				<div className="people-selection-buttons">
					<button type='button' className="btn btn-blue decrement-people"><i className="fas fa-minus"></i></button>
					<span className='adults'>1</span>
					<button type='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></button>
				</div>
			</div>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Children</h3>
					<p className='description'>between 2 and 12 years</p>
				</div>

				<div className="people-selection-buttons">
					<button type='button' className="btn btn-blue decrement-people"><i className="fas fa-minus"></i></button>
					<span className='adults'>1</span>
					<button type='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></button>
				</div>
			</div>

			<div className="people-selection-box my-1">
				<div className="people-selection-info">
					<h3>Infants</h3>
					<p className='description'>up to 2 years old</p>
				</div>

				<div className="people-selection-buttons">
					<button type='button' className="btn btn-blue decrement-people"><i className="fas fa-minus"></i></button>
					<span className='adults'>1</span>
					<button type='button' className="btn btn-blue  increment-people"><i className="fas fa-plus"></i></button>
				</div>
			</div>

			<button type='button' className='btn btn-blue display-block'>Ready</button>
		</div>
	)
}

export default PeopleSelection;
