import React from 'react';

import SlideshowContextProvider from '../../../../context/slideshow/SlideshowContext';

import SlideshowImage from './SlideshowImage';
import ShowcaseInfo from './ShowcaseInfo';
import SlideshowButtons from './SlideshowButtons';
import CheckinForm from '../../../global_layout/CheckinForm';

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
					<CheckinForm flights={true} hotels={true} />
				</div>
			</section>
		</SlideshowContextProvider>
	)
}

export default Showcase;
