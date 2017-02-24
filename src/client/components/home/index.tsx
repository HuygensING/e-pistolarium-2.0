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
			labels={{
				facetTitles: {
					corpora: 'Corpora',
					recipientLocs: 'Recipient locations',
					recipients: 'Recipients',
					senderLocs: 'Sender locations',
					senders: 'Senders',
					term: 'Full text search',
				}
			}}
			onChange={props.receiveSearchResult}
			onSelect={(letter) => history.push(`/letters/${letter.pid}`)}
		/>
	</div>;
