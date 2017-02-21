export const receiveSearchResult = (result, query) => (dispatch) =>
	dispatch({
		type: 'RECEIVE_SEARCH_RESULT',
		query,
		result,
	});
