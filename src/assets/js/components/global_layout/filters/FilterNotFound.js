import React, { useContext } from 'react';

import { GlobalContext } from '@context/GlobalContext';

const FilterNotFound = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='filter-not-found'>

			<div className='not-found-img mb-1'><img src={getImage('filter-not-found.svg')} alt='not found' /></div>

			<div className="not-found-info text-center">
				<h2 className='heading heading-1 mb-1'>No results found <span className='ml-1'><i className="far fa-surprise"></i></span></h2>
				<p className='description'>Maybe you need to change the filters.</p>
			</div>
		</section>
	);

};

export default FilterNotFound;