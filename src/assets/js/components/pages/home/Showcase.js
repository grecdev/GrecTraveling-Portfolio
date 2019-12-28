import React from 'react';

import SlideshowImage from './SlideshowImage';

const Showcase = () => {

	return (
		<section id='showcase' className='overlay overlay-normal'>
			<div className="slide">
				<SlideshowImage />
			</div>
		</section>
	)
}

export default Showcase;
