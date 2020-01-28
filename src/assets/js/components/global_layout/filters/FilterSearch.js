import React from 'react';
import PropTypes from 'prop-types';

import FilterSearchFlights from '../../pages/flights/FilterSearchFlights';

const FilterSearch = ({ flights, hotels }) => {
	return (
		<aside id='filter-search-section' className='px-1'>
			{flights && (
				<FilterSearchFlights />
			)}

			{hotels && (
				<p>HOTELS FILTER SEARCH Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit recusandae in impedit. Facilis similique dolores natus officia quibusdam itaque eos nisi ipsa quaerat voluptate numquam, delectus exercitationem enim aperiam, iusto earum amet laboriosam quod dolorem, perspiciatis officiis aut. Nam vero illum, maxime tempore odio iusto, ullam reiciendis aut quia esse perspiciatis ratione atque dolorem suscipit hic odit accusantium minima quo veritatis dignissimos cupiditate temporibus sint officiis? Neque omnis perferendis facilis explicabo consectetur reiciendis optio accusantium doloremque cumque accusamus, amet, temporibus illo similique consequatur dolores quo voluptatibus, sunt sint aliquid aspernatur. A quaerat placeat officiis porro inventore corporis harum, cum aperiam ut voluptatibus laboriosam quidem, quas similique sapiente impedit accusantium perspiciatis quasi consectetur dolores. Sunt unde eius, sapiente, illum, nesciunt iste sint neque optio ipsa laudantium aliquid? Tempora iste aliquid numquam delectus tenetur nisi non fugit explicabo distinctio laborum illum quibusdam harum, vel similique ex quas pariatur ipsa fuga obcaecati aut tempore voluptate soluta sequi ratione. Debitis incidunt id quos neque. Fugiat vero natus, dolorum doloremque eaque quidem harum eum nobis perferendis et distinctio facere quas non totam nemo autem maxime labore? Cupiditate delectus corporis nemo, debitis quibusdam atque officia eaque ab cum maiores eligendi sunt incidunt quae fugiat accusamus. Quo!</p>
			)}
		</aside>
	)
}

FilterSearch.propTypes = {
	flights: PropTypes.bool.isRequired,
	hotels: PropTypes.bool.isRequired
}

export default FilterSearch
