import * as React from 'react';
import HireFacetedSearch from 'hire-faceted-search';

export default (props) =>
	<div className="home">
		<HireFacetedSearch
			config={{
				baseURL: '/api/search-result-location',
				searchPath: '',
			}}
		/>
	</div>;

// baseURL: 'http://tc13.huygens.knaw.nl/glp-ckcc/',
