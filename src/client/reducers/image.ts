const initialState = {
	imageHeight: null,
	imageSrc: null,
	imageWidth: null,
	percentageLoaded: 0,
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'IMAGE_UPLOAD_START': {
			nextState = { ...nextState, ...{
				imageHeight: action.image.height,
				imageSrc: action.imageSrc,
				imageWidth: action.image.width,
			}};
			break;
		}

		case 'IMAGE_UPLOAD_PROGRESS': {
			nextState = { ...nextState, ...{
				percentageLoaded: action.percentage,
			}};
			break;
		}

		default:
	}

	return nextState;
};
