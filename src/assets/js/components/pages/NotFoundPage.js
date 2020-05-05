import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '@context/GlobalContext';

export class NotFoundPage extends Component {

	static contextType = GlobalContext;

	render() {

		const { getImage } = this.context;

		return (
			<section id="not-found-page">

				<div>
					<Link to='/'><i className="fas fa-chevron-left" aria-hidden="true"></i> Back to home page</Link>

					<div className="not-found-image mb-3">
						<p>4</p>
						<img src={getImage('not-found.svg')} alt='not-found' />
						<p>4</p>
					</div>

					<h1 className='heading heading-3'>PAGE NOT FOUND</h1>
				</div>
			</section>
		)
	}
}

export default NotFoundPage;
