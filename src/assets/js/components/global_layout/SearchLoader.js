import React from 'react';

import video from '../../../media/search-loader.mp4';

console.log(video);

const SearchLoader = () => {

	return (
		<div className='search-loader'>
			<video autoPlay loop muted>

				<source src={video} type='video/mp4' />

			</video>
		</div>
	)
};

export default SearchLoader;
