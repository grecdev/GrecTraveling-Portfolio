import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalContext } from '../../../context/GlobalContext';

const Showcase = () => {

	const { getImage } = useContext(GlobalContext);

	const images = ['amsterdam-showcase.jpg', 'paris-showcase.jpg', 'bali-showcase.jpg'];
	const [imageChange, setImageChange] = useState(images[0]);
	let index = 0;

	useEffect(() => {
		setInterval(() => {

			index < 2 ? index++ : index = 0;

			setImageChange(images[index]);

		}, 3000);
	}, []);

	const ShowcaseStyled = styled.section`
		background: url(${getImage(imageChange)}) no-repeat center/cover;
		width: 100vw;
		height: 100vh;
	`;

	return (
		<ShowcaseStyled id='showcase' className='overlay-bg'>
			ddd
		</ShowcaseStyled>
	)
}



export default Showcase;
