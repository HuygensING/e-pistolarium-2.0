const initialState = {
	latestUploads: [],
	token: null,
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'USER_LOGIN': {
			const { latestUploads, token } = action;
			nextState = { ...nextState, ...{ latestUploads, token }};
			break;
		}

		case 'USER_LOGOUT': {
			nextState = initialState;
			break;
		}

		default:
	}

	return nextState;
};
