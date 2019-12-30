import React from 'react';

import SlideshowContextProvider from '../../../../context/slideshow/SlideshowContext';

import SlideshowImage from './SlideshowImage';
import ShowcaseInfo from './ShowcaseInfo';
import SlideshowButtons from './SlideshowButtons';
import CheckinForm from './CheckinForm';

const Showcase = () => {
	return (

		<SlideshowContextProvider>
			<section id='showcase' className='overlay overlay-normal'>
				<div className="slide">
					<SlideshowImage />
				</div>

				<div className="showcase-container">
					<ShowcaseInfo />
					<SlideshowButtons />
					<CheckinForm />
				</div>
			</section>
		</SlideshowContextProvider>
	)
}

export default Showcase;
