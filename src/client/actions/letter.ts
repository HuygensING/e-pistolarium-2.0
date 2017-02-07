import 'whatwg-fetch';

const metadataUrl = (id) =>
	`http://tc13.huygens.knaw.nl/glp-ckcc/letters/${id.replace('-', '/')}/text`;

const teiUrl = (id) => `/api/tei?id=${id}`;
	// `http://demo7.huygens.knaw.nl/glp-ckcctest/letters/${id.replace('-', '/')}/tei`;

export const fetchLetter = (id) => async (dispatch/*, getState */) => {
	const metadataResponse = await fetch(metadataUrl(id));
	const metadata = await metadataResponse.json();

	const teiResponse = await fetch(teiUrl(id));
	const tei = await teiResponse.text();
	metadata.tei = tei;

	let message = {
		value: 'Failed to retrieve letter.',
		type: 'error',
	};

	if (metadataResponse.status === 200) {
	// if (teiResponse.status === 200 && metadataResponse.status === 200) {
		dispatch({
			letter: metadata,
			type: 'RECEIVE_LETTER',
		});

		message = {
			value: 'Letter received',
			type: 'success',
		};
	}

	dispatch({
		message,
		type: 'RECEIVE_MESSAGE',
	});
};
