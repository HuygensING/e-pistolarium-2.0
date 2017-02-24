import 'whatwg-fetch';
import {backendUrl} from "../../server/constants";
import history from '../routes/history';
import {addMessage} from "./message";

const metadataUrl = (id) =>
	`${backendUrl}letters/${id}/text`;

export const fetchLetterText = async (letterId) => {
	const url = `/api/tei?id=${letterId}`;
	const response = await fetch(url);
	const text = await response.text();
	return text;
};

export const fetchLetter = (id: string, subId: string) => async (dispatch, getState) => {
	const { all, current } = getState().letter;

	const letterId = `${id}/${subId}`;

	// If the current ID is equal to the next ID, do nothing.
	if (current.pid === letterId)	return;

	// If the next letter is cached, set it and do nothing else.
	const cachedLetter = all.find((l) => l.pid === letterId);
	if (cachedLetter != null) {
		return dispatch({
			letter: cachedLetter,
			type: 'SET_LETTER',
		})
	}

	// Fetch metadata.
	const metadataResponse = await fetch(metadataUrl(letterId));
	const metadata = await metadataResponse.json();

	// Fetch TEI/XML.
	const letterText = await fetchLetterText(letterId);
	metadata.text = letterText;

	// The default message is an error.
	let message = {
		value: 'Failed to retrieve letter.',
		type: 'error',
	};


	// If the responses are OK, set the new letter and override the error message
	// with a success message.
	if (metadataResponse.status === 200) {
		dispatch({
			letter: metadata,
			type: 'RECEIVE_LETTER',
		});

		message = {
			value: `Letter "${metadata.pid}" received`,
			type: 'success',
		};
	}

	addMessage(message, dispatch);
};

export const goToLetter = (letter) => (dispatch) =>
	history.push(`/letters/${letter.pid}`);