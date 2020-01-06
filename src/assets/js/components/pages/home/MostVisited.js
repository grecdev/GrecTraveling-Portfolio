import React from 'react';

import SectionHeader from '../../global_layout/SectionHeader';

const MostVisited = () => {

	return (
		<section id='most-visited'>
			<div className="container p-2">
				<SectionHeader title={'Most visited places'} image={'section-header-logo-white.svg'} />

				<div className="most-visited-container">

					<div className="most-visited-box text-center one overlay overlay-light">

						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Barcelona</h4>
							<p className='mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

							<a data-place='barcelona' className='btn btn-blue'>See more</a>
						</div>
					</div>

					<div className="most-visited-box text-center two overlay overlay-light">

						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Roma</h4>
							<p className='mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

							<a data-place='roma' className='btn btn-blue'>See more</a>
						</div>

					</div>

					<div className="most-visited-box text-center three overlay overlay-light">
						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Maldive</h4>
							<p className='mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

							<a data-place='maldive' className='btn btn-blue'>See more</a>
						</div>
					</div>

					<div className="most-visited-box text-center four overlay overlay-light">
						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Vietnam</h4>
							<p className='mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

							<a data-place='vietnam' className='btn btn-blue'>See more</a>
						</div>
					</div>

					<div className="most-visited-box text-center five overlay overlay-light">
						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Dubai</h4>
							<p className='mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

							<a data-place='dubai' className='btn btn-blue'>See more</a>
						</div>
					</div>

					<div className="most-visited-box text-center six overlay overlay-light">
						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Taj Mahal</h4>
							<p className='mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

							<a data-place='taj-mahal' className='btn btn-blue'>See more</a>
						</div>
					</div>

					<div className="most-visited-box text-center seven overlay overlay-light">
						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Austria</h4>
							<p className='mb-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

							<a data-place='austria' className='btn btn-blue'>See more</a>
						</div>
					</div>

				</div>
			</div>
		</section>
	)
}

export default MostVisited;
