import constructQuery from './construct-query';

const ckccBackendUrl = 'http://tc13.huygens.knaw.nl/glp-ckcc/search';

const addFacet = (data, name, labels, type = 'LIST') => {
	return {
		name,
		options: Object
			.keys(data[name])
			.map((key) => {
				return {
					name: data[labels].find((p) => p.pid === key).label,
					count: data[name][key],
				}
			}),
		type,
	}
};

const toLookup = (prev, curr) => {
	prev[curr.label] = curr.pid;
	return prev;
};

const fetchAndSendResult = async (url, res) => {
	const result = await fetch(url);
	const data = await result.json();
	data.results = [];
	data.sortableFields = [];
	data.facets = [];
	data.facets.push(addFacet(data, 'senders', 'personLabels'));
	data.facets.push(addFacet(data, 'recipients', 'personLabels'));
	data.facets.push(addFacet(data, 'senderLocs', 'placeLabels'));
	data.facets.push(addFacet(data, 'recipientLocs', 'placeLabels'));
	data.facets.push(addFacet(data, 'corpora', 'corpusLabels'));
	res.json(data);
	return data;
};

export default (app, state) => {
	app.post('/search-result-location', async (req, res) => {
		const { facetValues, sortParameters, term } = req.body;
		const initFacets = (!facetValues.length && !sortParameters.length && term === '');

		const body = initFacets ?
			`q=${encodeURIComponent('*:*')}` :
			constructQuery(req.body, state);

		const result = await fetch(ckccBackendUrl, {
			method: 'POST',
			body,
		});
		const data = await result.json();
		const location = initFacets ?
			`/api/init-facets?key=${data.key}` :
			`/api/facets?key=${data.key}`;
		res.set('Location', location);

		res.end();
	});

	app.get('/init-facets', async (req, res) => {
		const url = `${ckccBackendUrl}/${req.query.key}?rows=0&verbose=true`;
		const data = await fetchAndSendResult(url, res);
		state.set('personLabels', data.personLabels.reduce(toLookup, {}));
		state.set('placeLabels', data.placeLabels.reduce(toLookup, {}));
		state.set('corpusLabels', data.corpusLabels.reduce(toLookup, {}));
	});

	app.get('/facets', async (req, res) => {
		const url = `${ckccBackendUrl}/${req.query.key}?rows=50&verbose=true`;
		fetchAndSendResult(url, res);
	});
}
