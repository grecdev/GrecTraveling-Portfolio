import React from 'react';

import Image from '@components/global_layout/Image';

const History = () => {

	return (
		<section id='history' className='p-3'>

			<div className="history-box">

				<div className="history-box-image mr-3">
					<Image src='experience-hourglass.svg' />
				</div>

				<div className="history-box-info">
					<p>20 years</p>
					<p>of experience</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3">
					<Image src='globe-history.svg' />
				</div>

				<div className="history-box-info">
					<p>100</p>
					<p>countries</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3">
					<Image src='history-people.svg' />
				</div>

				<div className="history-box-info">
					<p>200 millions</p>
					<p>users</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3">
					<Image src='airlane-history.svg' />
				</div>

				<div className="history-box-info">
					<p>500</p>
					<p>Airlane companies</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3">
					<Image src='hotels-history.svg' />
				</div>

				<div className="history-box-info">
					<p>500 millions</p>
					<p>hotels</p>
				</div>
			</div>
		</section>
	)
}

export default History;
