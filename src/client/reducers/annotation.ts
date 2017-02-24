export interface INewAnnotation {
	endAnchor: Node;
	highlightSpans: HTMLElement[];
	offset: number;
	range: Range;
	startAnchor: Node;
	text: string;
}

export interface IAnnotation {
	birthDate: string;
	deathDate: string;
	name: string;
	selectedText: string;
	type: string;
}

interface IState {
	active: IAnnotation;
	new: INewAnnotation;
}

const initialState: IState = {
	active: {
		birthDate: null,
		deathDate: null,
		name: null,
		selectedText: null,
		type: null,
	},
	new: {
		endAnchor: null,
		highlightSpans: null,
		offset: null,
		range: null,
		startAnchor: null,
		text: null,
	}
};

const remove = (el) => el.parentNode.removeChild(el);

// Unwrap a textNode. In this case: <span class="highlight">some text content</span> => some text content.
// During the creation of the span's, single textNodes where wrapped with the span, so we can be certain
// node.childNodes[0] returns the only textNode present.
const unwrap = (node) => node.parentNode.replaceChild(node.childNodes[0], node);

const removeNewAnnotation = (state: IState): void => {
	remove(state.new.startAnchor);
	remove(state.new.endAnchor);
	state.new.highlightSpans.forEach(unwrap);
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'CREATE_ANNOTATION': {
			nextState = initialState;
			nextState = { ...nextState, ...{ new: action }};
			break;
		}

		case 'REMOVE_NEW_ANNOTATION': {
			removeNewAnnotation(nextState);
			nextState = initialState;
			break;
		}

		case 'CANCEL_ANNOTATION': {
			nextState = initialState;
			break;
		}

		case 'SET_ACTIVE_ANNOTATION': {
			if (nextState.new.text != null) removeNewAnnotation(nextState);
			nextState = { ...initialState, ...{ active: action.annotation }};
			break;
		}

		default:
	}

	return nextState;
};
