import 'whatwg-fetch';
import {addMessage} from "../message";
import TreeWalkerContainer from './tree-walker-container';
import findCommonAncestor from './find-common-ancestor';
import {backendUrl} from "../../../server/constants";
import {fetchLetterText} from "../letter";

export const removeNewAnnotation = () => (dispatch) =>
	dispatch({ type: 'REMOVE_NEW_ANNOTATION'});

export const saveNewAnnotation = () => async (dispatch, getState) => {
	const { annotation, letter } = getState();
	const { length, offset, text, xmlId } = annotation;
	// TODO check if all data is present
	const url = `${backendUrl}letters/${letter.current.pid}/annotations?xmlId=${xmlId}&offset=${offset}&length=${text.length}&name=user&json=1`;
	const response = await fetch(url);
	const json = await response.json();
	const nextLetterText = await fetchLetterText(letter.current.pid));

	dispatch({
		type: 'UPDATE_LETTER_TEXT',
		text: nextLetterText,
	});
};

export const createAnnotation = () => (dispatch, getState) => {
	const selection = window.getSelection();

	// If the selection has no length, an annotation cannot be made.
	if (selection.isCollapsed) return;

	// A new selection has been made. Remove the old selection/range.
	if (getState().annotation.range != null) removeNewAnnotation()(dispatch);

	// Extract the range from the selection.
	const range = selection.getRangeAt(0);

	// Find the common ancestor. The ancestor is needed to calculate the
	// offset of the selection.
	const commonAncestor = findCommonAncestor(range);
	if (commonAncestor == null) {
		const message = {
			type: 'error',
			value: 'Common ancestor is missing a "data-xml-id" attribute!',
		};
		addMessage(message, dispatch);
		selection.empty();
		return;
	}

	// Insert an anchor at the start and at the end of the selection.
	const startAnchor = document.createElement('a');
	startAnchor.className = 'start-new-tag';
	const endAnchor = document.createElement('a');
	endAnchor.className = 'end-new-tag';
	range.insertNode(startAnchor);
	range.collapse(false);
	range.insertNode(endAnchor);

	// Use a TreeWalker to wrap all textNodes with a span.highlight.
	let text = '';
	const highlightSpans = [];
	const treeWalkerContainer = new TreeWalkerContainer(startAnchor, endAnchor, commonAncestor);
	const treeWalker = treeWalkerContainer.treeWalker;
	while (treeWalker.nextNode()) {
		const node = treeWalker.currentNode;
		const textRange = document.createRange();
		textRange.selectNode(node);
		const span = document.createElement('span');
		span.className = 'highlight';
		textRange.surroundContents(span);
		text = `${text}${node.textContent}`;
		highlightSpans.push(span);
	}

	dispatch({
		endAnchor,
		highlightSpans,
		offset: treeWalkerContainer.offset,
		range,
		startAnchor,
		text,
		type: 'CREATE_ANNOTATION',
		xmlId: commonAncestor.dataset.xmlId,
	});
	selection.empty();
};