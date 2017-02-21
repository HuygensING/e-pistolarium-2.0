const removeMessage = (dispatch) =>
	dispatch({ type: 'REMOVE_MESSAGE'});

export const addMessage = (message, dispatch) => {
	setTimeout((() => removeMessage(dispatch)), 3000);

	dispatch({
		type: 'ADD_MESSAGE',
		message,
	});
};

