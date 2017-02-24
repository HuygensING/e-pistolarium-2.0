import TreeWalkerContainer from "./tree-walker-container";

interface IOptions {
	nodeName?: string;
	className?: string;
	commonAncestor?: Node;
}
export default (startAnchor: Node, endAnchor: Node, options?: IOptions) => {
	if (options == null) options = {};

	const nodeName = (options.hasOwnProperty('nodeName')) ?
		options.nodeName :
		'span';

	const className = (options.hasOwnProperty('className')) ?
		options.className :
		'highlight';

	const treeWalkerContainer = new TreeWalkerContainer(startAnchor, endAnchor, options.commonAncestor);
	const treeWalker = treeWalkerContainer.treeWalker;
	while (treeWalker.nextNode()) {
		const node = treeWalker.currentNode;
		const textRange = document.createRange();
		textRange.selectNode(node);
		const el = document.createElement(nodeName);
		el.className = className;
		textRange.surroundContents(el);
	}
}
