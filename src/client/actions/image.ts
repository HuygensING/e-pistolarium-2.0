export const uploadImage = (file) => (dispatch, getState) => {
	const onLoad = (ev) => {
		const image = new Image();
		image.addEventListener('load', () => {
			dispatch({
				type: 'IMAGE_UPLOAD_START',
				image,
				imageSrc: fileReader.result,
			});
		});
		image.src = fileReader.result;
	};

	const fileReader = new FileReader();
	fileReader.addEventListener('load', onLoad);
	fileReader.readAsDataURL(file);

	const onProgress = (ev) => {
		dispatch({
			type: 'IMAGE_UPLOAD_PROGRESS',
			percentage: ev.loaded / ev.total,
		});
	};

	const onReadystatechange = (ev) => {
		if (xhr.readyState === 4) {
			dispatch({
				type: 'RECEIVE_MESSAGE',
				message: JSON.parse(ev.target.response),
			});
			dispatch({
				type: 'IMAGE_UPLOAD_READY',
			});
		}
	};

	const formData = new FormData();
	formData.append('image', file);

	const xhr = new XMLHttpRequest();
	xhr.upload.addEventListener('progress', onProgress);
	xhr.addEventListener('readystatechange', onReadystatechange);
	xhr.open('POST', '/api/upload');
	xhr.setRequestHeader('Authorization', getState().user.token);
	xhr.send(formData);
};
