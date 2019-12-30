import React from 'react';

import SlideshowContextProvider from '../../../context/slideshow/SlideshowContext';

import SlideshowImage from './SlideshowImage';
import SlideshowButtons from './SlideshowButtons';

const Showcase = () => {
	return (

		<SlideshowContextProvider>
			<section id='showcase' className='overlay overlay-normal'>
				<div className="slide">
					<SlideshowImage />
				</div>

				<div className="showcase-container">
					<SlideshowButtons />
				</div>
			</section>
		</SlideshowContextProvider>
	)
}

export default Showcase;
