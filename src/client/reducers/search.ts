const initialState = {
	nextLetter: null,
	prevLetter: null,
	result: null,
	resultCount: 0,
	results: {},
};

const findPrevAndNextLetter = (letter, result) => {
	let nextLetter = null;
	let prevLetter = null;

	if (result != null) {
		const letterIndex = result.findIndex((r) => r.pid === letter.pid);
		if (letterIndex > -1 && letterIndex < result.length) {
			if (letterIndex > 0) prevLetter = result[letterIndex - 1];
			if (letterIndex < (result.length - 1)) nextLetter = result[letterIndex + 1];
		}
	}

	return { nextLetter, prevLetter };
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_SEARCH_RESULT': {
			const results = {
				...state.results,
				...{ [JSON.stringify(action.query)]: action.result },
			};

			nextState = {
				...nextState,
				...{
					nextLetter: null,
					prevLetter: null,
					result: action.result.results,
					resultCount: action.result.numFound,
					results,
				}
			};
			break;
		}

		case 'RECEIVE_LETTER': {
			const letters = findPrevAndNextLetter(action.letter, state.result);
			nextState = { ...nextState, ...letters };
			break;
		}

		case 'SET_LETTER': {
			const letters = findPrevAndNextLetter(action.letter, state.result);
			nextState = { ...nextState, ...letters };
			break;
		}

		default:
	}

	return nextState;
};
