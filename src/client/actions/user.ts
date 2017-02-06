import 'whatwg-fetch';
import history from '../routes/history';

export const userLogin = (formData) => async (dispatch/*, getState */) => {
	const url = '/api/login';
	const initData = {
		body: formData,
		method: 'POST',
	};

	const response = await fetch(url, initData);
	const { latestUploads, message } = await response.json();

	if (response.status === 200) {
		dispatch({
			latestUploads,
			token: response.headers.get('Authorization'),
			type: 'USER_LOGIN',
		});

		history.replace('/');
	}

	dispatch({
		message,
		type: 'RECEIVE_MESSAGE',
	});
};
