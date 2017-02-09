const initialState = {
	endAnchor: null,
	highlightSpans: null,
	offset: null,
	range: null,
	startAnchor: null,
	text: null,
};

const remove = (el) => el.parentNode.removeChild(el);

// Unwrap a textNode. In this case: <span class="highlight">some text content</span> => some text content.
// During the creation of the span's, single textNodes where wrapped with the span, so we can be certain
// node.childNodes[0] returns the only textNode present.
const unwrap = (node) => node.parentNode.replaceChild(node.childNodes[0], node);

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'CREATE_ANNOTATION': {
			nextState = { ...nextState, ...action};
			break;
		}

		case 'REMOVE_NEW_ANNOTATION': {
			remove(nextState.startAnchor);
			remove(nextState.endAnchor);
			nextState.highlightSpans.forEach(unwrap);

			nextState = initialState;
			break;
		}

		default:
	}

	return nextState;
};
