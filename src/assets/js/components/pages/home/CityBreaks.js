import React from 'react';

import SectionHeader from '@components/global_layout/SectionHeader';
import Image from '@components/global_layout/Image';

const CityBreaks = () => {

	return (
		<section id='city-breaks'>
			<div className="container p-2">
				<SectionHeader title={'City breaks offers'} image={'section-header-logo-blue.svg'} />

				<div className="city-breaks-wrapper">

					<div className="city-breaks-box">
						<div className="city-breaks-label">
							<span><i className="fas fa-plane"></i></span>
							<span><i className="fas fa-plus mx-1"></i></span>
							<span><i className="fas fa-bed"></i></span>
						</div>

						<div className="city-breaks-container">
							<div className="city-breaks-image">
								<Image src='vietnam-offer.jpg' />
							</div>

							<div className="city-breaks-info">
								<div>
									<h3>City Break Vietnam</h3>

									<p>Flight + Accomodation <span><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i></span></p>
								</div>

								<div className='text-right'>
									<p>Starting From</p>
									<p>100 &euro;</p>
								</div>
							</div>

							<div className="city-breaks-footer text-center">
								<a className='btn btn-yellow display-block'>Details</a>
							</div>
						</div>
					</div>

					<div className="city-breaks-box">
						<div className="city-breaks-label">
							<span><i className="fas fa-plane"></i></span>
							<span><i className="fas fa-plus mx-1"></i></span>
							<span><i className="fas fa-bed"></i></span>
						</div>

						<div className="city-breaks-container">
							<div className="city-breaks-image">
								<Image src='amsterdam-offer.jpg' />
							</div>

							<div className="city-breaks-info">
								<div>
									<h3>City Break Amsterdam</h3>

									<p>Flight + Accomodation <span><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i><i className="far fa-star"></i></span></p>
								</div>

								<div className='text-right'>
									<p>Starting From</p>
									<p>150 &euro;</p>
								</div>
							</div>

							<div className="city-breaks-footer text-center">
								<a className='btn btn-yellow display-block'>Details</a>
							</div>
						</div>
					</div>

					<div className="city-breaks-box">
						<div className="city-breaks-label">
							<span><i className="fas fa-plane"></i></span>
							<span><i className="fas fa-plus mx-1"></i></span>
							<span><i className="fas fa-bed"></i></span>
						</div>

						<div className="city-breaks-container">
							<div className="city-breaks-image">
								<Image src='paris-offer.jpg' />
							</div>

							<div className="city-breaks-info">
								<div>
									<h3>City Break Paris</h3>

									<p>Flight + Accomodation <span><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i><i className="far fa-star"></i><i className="far fa-star"></i></span></p>
								</div>

								<div className='text-right'>
									<p>Starting From</p>
									<p>200 &euro;</p>
								</div>
							</div>

							<div className="city-breaks-footer text-center">
								<a className='btn btn-yellow display-block'>Details</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>
	)
}

export default CityBreaks;
