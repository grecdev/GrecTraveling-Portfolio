import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/global/GlobalContext';

import SectionHeader from '../../global_layout/SectionHeader';

const Choose = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='choose-us'>
			<div className="container p-2">
				<SectionHeader title={'Why to choose us'} image={'section-header-logo-blue.svg'} />

				<div className="choose-us-container">

					<div className="choose-us-box p-1 mx-1 text-center">
						<img className='mb-1' src={getImage('fast-flights.svg')} alt="fast-flights" />
						<h4 className='heading mb-1'>Fast Flights</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>

					<div className="choose-us-box p-1 mx-1 text-center">
						<img className='mb-1' src={getImage('nice-cars.svg')} alt="nice-cars" />
						<h4 className='heading mb-1'>Nice Cars</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>

					<div className="choose-us-box p-1 mx-1 text-center">
						<img className='mb-1' src={getImage('lux-cruises.svg')} alt="lux-cruises" />
						<h4 className='heading mb-1'>Luxury Cruises</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>

					<div className="choose-us-box p-1 mx-1 text-center">
						<img className='mb-1' src={getImage('cheap-hotels.svg')} alt="cheap-hotels" />
						<h4 className='heading mb-1'>Cheap Hotels</h4>
						<p className='description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, dolorum.</p>
					</div>


				</div>
			</div>
		</section>
	)
}

export default Choose;
