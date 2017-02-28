/**
 * Map the backend ID to the facet ID.
 *
 * The search POST returns a list of facets which have an ID,
 * but this is not the ID the server is expecting in the query.
 *
 * The backend IDs are found using the old CKCC site (http://ckcc.huygens.knaw.nl/epistolarium)
 */
const propByFacet = {
	senders: 'sender_id',
	senderLocs: 'sender_loc_id',
	recipients: 'recipient_id',
	recipientLocs: 'recipient_loc_id',
	corpora: 'corpus_id',
};

/**
 * Map the label property to the facet ID.
 *
 * The initial search POST returns the person, place and corpus labels.
 * This map is used to match the facet to the right labels.
 */
const labelsByFacet = {
	senders: 'personLabels',
	senderLocs: 'placeLabels',
	recipients: 'personLabels',
	recipientLocs: 'placeLabels',
	corpora: 'corpusLabels',
};

export default (body, state) => {
	const { facetValues, sortParameters, term } = body;
	const query = facetValues.reduce((prev, curr) => {
		const prop = propByFacet[curr.name];
		const labels = labelsByFacet[curr.name];
		const values = curr.values
			.map((v) => state.get(labels)[v])
			.join(' ');
		return `${prev}+${prop}:(${values}) `;
	}, '');
	const sort = 'date';
	return `${encodeURIComponent(query.trim())}&sort=${sort}`;
}
