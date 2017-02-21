import * as React from 'react';
import HireFacetedSearch from 'hire-faceted-search';
import history from '../../routes/history';

export default (props) =>
	<div className="home">
		<HireFacetedSearch
			config={{
				baseURL: '/api/search-result-location',
				searchPath: '',
			}}
			onChange={props.receiveSearchResult}
			onSelect={(letter) => history.push(`/letters/${letter.pid}`)}
		/>
	</div>;
