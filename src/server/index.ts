#!/usr/bin/env node

import 'isomorphic-fetch';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const ckccBackendUrl = 'http://tc13.huygens.knaw.nl/glp-ckcc/search';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/search-result-location', async (req, res) => {
	const result = await fetch(ckccBackendUrl, {
		method: 'POST',
		body: `q=${encodeURIComponent('*:*')}`,
	});
	const data = await result.json();
	console.log(data);
	res.set('Location', `/api/facets?key=${data.key}`);
	res.end();
});

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

app.get('/facets', async (req, res) => {
	const url = `${ckccBackendUrl}/${req.query.key}?rows=0&verbose=true`;
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
});

const port = 3999;
app.listen(port, () => console.log(`Listening on port ${port}!`));
