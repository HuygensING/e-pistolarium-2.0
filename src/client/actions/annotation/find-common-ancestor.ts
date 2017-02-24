// Native alternative to $.closest
// See http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
const closest = (el, selector) => {
	while (el) {
		if (el.matches && el.matches(selector)) return el;
		el = el.parentNode;
	}
};

export default (range) => {
	let ancestor = range.commonAncestorContainer;

	if (ancestor.nodeType === Node.ELEMENT_NODE) {
		if (!ancestor.hasAttribute('data-xml-id')) {
			ancestor = closest(ancestor, '[data-xml-id]');
		}
	} else {
		ancestor = closest(ancestor, '[data-xml-id]');
	}

	return ancestor;
};
