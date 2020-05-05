import React from 'react';

import Image from '@components/global_layout/Image';

const FilterNotFound = () => {

	return (
		<section id='filter-not-found'>

			<div className='not-found-img mb-1'><Image src='filter-not-found.svg' /></div>

			<div className="not-found-info text-center">
				<h2 className='heading heading-1 mb-1'>No results found <span className='ml-1'><i className="far fa-surprise"></i></span></h2>
			</div>
		</section>
	);

};

export default FilterNotFound;