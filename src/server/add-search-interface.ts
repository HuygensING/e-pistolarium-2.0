import constructQuery from './construct-query';
import { backendUrl } from "./constants";

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

const toResult = (letter) => {
	letter.data = {
		date: letter.date,
		language: letter.language,
		recipientLoc: letter.recipientLoc,
		senderLoc: letter.senderLoc,
	};
	letter.displayName = `From ${letter.sender} to ${letter.recipient}`;
	console.log(letter);
	return letter;
};

const fetchAndSendResult = async (url, res) => {
	const result = await fetch(url);
	const data = await result.json();
	data.results = data.letters.map(toResult);
	data.sortableFields = [];
	data.facets = [];
	data.facets.push(addFacet(data, 'senders', 'personLabels'));
	data.facets.push(addFacet(data, 'recipients', 'personLabels'));
	data.facets.push(addFacet(data, 'senderLocs', 'placeLabels'));
	data.facets.push(addFacet(data, 'recipientLocs', 'placeLabels'));
	data.facets.push(addFacet(data, 'corpora', 'corpusLabels'));
	delete data.letters;
	delete data.senders;
	delete data.recipients;
	delete data.senderLocs;
	delete data.recipientLocs;
	delete data.corpora;
	res.json(data);
	return data;
};

export default (app, state) => {
	app.post('/search-result-location', async (req, res) => {
		const { facetValues, sortParameters, term } = req.body;
		const initFacets = (!facetValues.length && !sortParameters.length && term === '');
		const query = initFacets ?
			encodeURIComponent('*:*') :
			constructQuery(req.body, state);
		const result = await fetch(`${backendUrl}search`, {
			method: 'POST',
			body: `q=${query}`,
		});
		const data = await result.json();
		const location = initFacets ?
			`/api/init-facets?key=${data.key}` :
			`/api/facets?key=${data.key}`;
		res.set('Location', location);
		res.end();
	});

	app.get('/init-facets', async (req, res) => {
		const url = `${backendUrl}search/${req.query.key}?rows=0&verbose=true`;
		const data = await fetchAndSendResult(url, res);
		state.set('personLabels', data.personLabels.reduce(toLookup, {}));
		state.set('placeLabels', data.placeLabels.reduce(toLookup, {}));
		state.set('corpusLabels', data.corpusLabels.reduce(toLookup, {}));
	});

	app.get('/facets', async (req, res) => {
		const url = `${backendUrl}search/${req.query.key}?rows=50&verbose=true`;
		fetchAndSendResult(url, res);
	});
}
