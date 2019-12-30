import React from 'react';

import SlideshowImage from './SlideshowImage';
import SlideshowButtons from './SlideshowButtons';

const Showcase = () => {

	const slideshowState = {
		startingImage: 2,
		changingTime: 4500
	}

	return (
		<section id='showcase' className='overlay overlay-normal'>
			<div className="slide">
				<SlideshowImage startingImage={slideshowState.startingImage} changingTime={slideshowState.changingTime} />
			</div>

			<div className="showcase-container">
				<SlideshowButtons startingImage={slideshowState.startingImage} changingTime={slideshowState.changingTime} />
			</div>
		</section>
	)
}

export default Showcase;
