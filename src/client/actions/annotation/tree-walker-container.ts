export default class TreeWalkerContainer {
	public offset: number = 1;
	public treeWalker: TreeWalker = null;
	private endNode: Node = null;
	private startNode: Node = null;
	private commonAncestor: Node = null;

	constructor(startNode, endNode, commonAncestor) {
		this.startNode = startNode;
		this.endNode = endNode;
		this.commonAncestor = commonAncestor;
		this.treeWalker = this.init();
	}

	private init() {
		const range = document.createRange();
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

		return document.createTreeWalker(this.commonAncestor, NodeFilter.SHOW_TEXT, <any> filter, false);
	}
}

