import {addMessage} from "./message";

class TreeWalkerContainer {
	public offset: number = 1;
	public treeWalker: TreeWalker = null;
	private endNode: Node = null;
	private startNode: Node = null;

	constructor(startNode, endNode) {
		this.startNode = startNode;
		this.endNode = endNode;
		this.treeWalker = this.init();
	}

	private init() {
		const range = document.createRange()
		range.setStartAfter(this.startNode);
		range.setEndBefore(this.endNode);

		const filter = (node: Node) => {
			const r = document.createRange();
			r.selectNode(node);

			const start = r.compareBoundaryPoints(Range.START_TO_START, range);
			const end = r.compareBoundaryPoints(Range.END_TO_START, range);

			if (start + end === -2) {
				this.offset += node.textContent.length;
			}

			return (start === -1 || end === 1) ?
				NodeFilter.FILTER_SKIP:
				NodeFilter.FILTER_ACCEPT;
		};

		filter['acceptNode'] = filter;

		return document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, <any> filter, false);
	}
}

// Native alternative to $.closest
// See http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
export const closest = (el, selector) => {
	while (el) {
		if (el.matches && el.matches(selector)) return el;
		el = el.parentNode;
	}
};

export const findCommonAncestor = (range) => {
	let ancestor = range.commonAncestorContainer;

	if (ancestor.nodeType === Node.ELEMENT_NODE) {
		if (!ancestor.hasAttribute('xml-id')) {
			ancestor = closest(ancestor, '[xml-id]');
		}
	} else {
		ancestor = closest(ancestor, '[xml-id]');
	}

	return ancestor;
};

export const removeNewAnnotation = () => (dispatch) =>
	dispatch({ type: 'REMOVE_NEW_ANNOTATION'});

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
			value: 'Common ancestor is missing an "xml:id"!',
		};
		addMessage(message, dispatch);
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
	const treeWalkerContainer = new TreeWalkerContainer(startAnchor, endAnchor);
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
	});
	selection.empty();
};