const initialState = {
	all: [],
	current: {
		keywords: null,
		meta: null,
		pid: null,
		simLetters: null,
		text: '',
	},
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_LETTER': {
			nextState = { ...nextState, ...{
				all: state.all.concat(action.letter),
				current: action.letter,
			}};
			break;
		}

		case 'SET_LETTER': {
			nextState = { ...nextState, ...{
				current: action.letter,
			}};
			break;
		}

		case 'UPDATE_LETTER_TEXT': {
			// todo implement
			break;
		}

		default:
	}

	return nextState;
};
