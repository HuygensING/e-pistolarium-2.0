import * as React from 'react';
import { connect } from 'react-redux';
import HireFacetedSearch from 'hire-faceted-search';
import history from '../../store/history';
import {receiveSearchResult} from "../../actions/search";

const Search = (props) =>
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

export default connect(
	null,
	{
		receiveSearchResult
	}
)(Search);
