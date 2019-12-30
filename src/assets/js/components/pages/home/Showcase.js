import React, { useEffect, useState } from 'react';

import SlideshowImage from './SlideshowImage';
import SlideshowButtons from './SlideshowButtons';

const Showcase = () => {

	const slideshowState = {
		startingImage: 1,
		incrementImage: 1,
		changingTime: 5500
	}

	const { startingImage, incrementImage, changingTime } = slideshowState;

	return (
		<section id='showcase' className='overlay overlay-normal'>
			<div className="slide">
				<SlideshowImage
					startingImage={startingImage}
					changingTime={changingTime}
					incrementImage={incrementImage}
				/>
			</div>

			<div className="showcase-container">
				<SlideshowButtons
					startingImage={startingImage}
					changingTime={changingTime}
					incrementImage={incrementImage}
				/>
			</div>
		</section>
	)
}

export default Showcase;
