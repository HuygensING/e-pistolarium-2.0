const propByFacet = {
	senders: 'sender_id',
	senderLocs: 'sender_loc_id',
	recipients: 'recipient_id',
};

const labelsByFacet = {
	senders: 'personLabels',
	senderLocs: 'placeLabels',
	recipients: 'personLabels',
};

export default (body, state) => {
	const { facetValues, sortParameters, term } = body;
	const query = facetValues.reduce((prev, curr) => {
		const prop = propByFacet[curr.name];
		const values = curr.values
			.map((v) => state.get(labelsByFacet[curr.name])[v])
			.join(' ');
		return `${prev}+${prop}:(${values}) `;
	}, '');
	const sort = 'date';
	return `q=${query}&sort=${sort}`;
}
