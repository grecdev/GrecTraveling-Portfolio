import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/global/GlobalContext';

const History = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<section id='history' className='p-3'>

			<div className="history-box">

				<div className="history-box-image mr-3"><img src={getImage('experience-hourglass.svg')} alt='experience hourglass' /></div>

				<div className="history-box-info">
					<p>20 years</p>
					<p>of experience</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3"><img src={getImage('globe-history.svg')} alt='globe history' /></div>

				<div className="history-box-info">
					<p>100</p>
					<p>countries</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3"><img src={getImage('history-people.svg')} alt='history people' /></div>

				<div className="history-box-info">
					<p>200 millions</p>
					<p>users</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3"><img src={getImage('airlane-history.svg')} alt='airlane history' /></div>

				<div className="history-box-info">
					<p>500</p>
					<p>Airlane companies</p>
				</div>
			</div>

			<div className="history-box">

				<div className="history-box-image mr-3"><img src={getImage('hotels-history.svg')} alt='hotels history' /></div>

				<div className="history-box-info">
					<p>500 millions</p>
					<p>hotels</p>
				</div>
			</div>


		</section>
	)
}

export default History;
