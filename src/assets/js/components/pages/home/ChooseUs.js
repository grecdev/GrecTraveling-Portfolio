import React from 'react';

import Image from '@components/global_layout/Image';
import SectionHeader from '@components/global_layout/SectionHeader';

const Choose = () => {

	return (
		<section id='choose-us'>
			<div className="container p-2">
				<SectionHeader title='Why to choose us' image='section-header-logo-blue.svg' />

				<div className="choose-us-container">

					<div className="choose-us-box p-1 mx-1 text-center">
						<div className='mb-1'>
							<Image src='fast-flights.svg' />
						</div>

						<h4 className='heading mb-1'>Fast Flights</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>

					<div className="choose-us-box p-1 mx-1 text-center">
						<div className='mb-1'>
							<Image src='nice-cars.svg' />
						</div>

						<h4 className='heading mb-1'>Nice Cars</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>

					<div className="choose-us-box p-1 mx-1 text-center">
						<div className='mb-1'>
							<Image src='lux-cruises.svg' />
						</div>

						<h4 className='heading mb-1'>Luxury Cruises</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>

					<div className="choose-us-box p-1 mx-1 text-center">
						<div className='mb-1'>
							<Image src='cheap-hotels.svg' />
						</div>

						<h4 className='heading mb-1'>Cheap Hotels</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>


				</div>
			</div>
		</section>
	)
}

export default Choose;
