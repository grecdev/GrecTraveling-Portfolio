import React, { useContext } from 'react';

import { GlobalContext } from '../../../../context/global/GlobalContext';

const MostVisited = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='most-visited'>
			<div className="container p-2">
				<div className="section-header text-center">
					<h3 className='mb-1 heading-1'>Most visited places</h3>

					<div className="section-header-logo mb-1"><img src={getImage('section-header-logo-dark.svg')} alt='section header logo' /></div>
				</div>

				<div className="most-visited-container">

					<div className="most-visited-box text-center one overlay overlay-light">

						<div className='most-visited-image'></div>

						<div className='most-visited-content text-center'>
							<div className="top-line"></div>
							<div className="right-line"></div>
							<div className="bottom-line"></div>
							<div className="left-line"></div>

							<h4 className='mb-1'>Barcelona</h4>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

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
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

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
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

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
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

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
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

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
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

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
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, vel.</p>

						</div>
					</div>

				</div>
			</div>
		</section>
	)
}

export default MostVisited;
