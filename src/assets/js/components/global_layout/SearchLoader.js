import React, { useContext } from 'react';

import { GlobalContext } from '@context/GlobalContext';

const SearchLoader = () => {

	const { getImage } = useContext(GlobalContext);

	return (
		<div className='search-loader'><img src={getImage('search-loader.gif')} alt='search loader' /></div>
	)
};

export default SearchLoader;
