import * as React from 'react';
import Meta from './meta';

interface IRecordProps {
	fetchLetter: (id: string) => void;
	letter: any;
	params: any;
}

const createTreeWalker = (startNode, endNode, nodeFilterConstant=NodeFilter.SHOW_ELEMENT) => {
	const range = document.createRange()
	range.setStartAfter(startNode);
	range.setEndBefore(endNode);

	const filter = (node) => {
		const r = document.createRange();
		r.selectNode(node);

		const start = r.compareBoundaryPoints(Range.START_TO_START, range);
		const end = r.compareBoundaryPoints(Range.END_TO_START, range);

		return (start === -1 || end === 1) ?
			NodeFilter.FILTER_SKIP:
			NodeFilter.FILTER_ACCEPT;
	};

	filter.acceptNode = filter;

	return document.createTreeWalker(range.commonAncestorContainer, nodeFilterConstant, filter, false);
};

class Record extends React.Component<IRecordProps, null> {
	public componentDidMount() {
		this.props.fetchLetter(this.props.params.id);
		document.addEventListener('mouseup', (ev) => {
			const selection = window.getSelection();
			if (selection.isCollapsed) return;
			const range = selection.getRangeAt(0);

			const startAnchor = document.createElement('a');
			startAnchor.className = 'start-new-tag';

			const endAnchor = document.createElement('a');
			endAnchor.className = 'end-new-tag';

			range.insertNode(startAnchor);
			range.collapse(false);
			range.insertNode(endAnchor);

			selection.empty();

			const treeWalker = createTreeWalker(startAnchor, endAnchor, NodeFilter.SHOW_TEXT);
			while (treeWalker.nextNode()) {
				const node = treeWalker.currentNode;
				const range = document.createRange();
				range.selectNode(node);
				const span = document.createElement('span');
				span.className = 'highlight';
				range.surroundContents(span);
			}
		})
	}

	public render() {
		const { meta, simLetters, tei, text } = this.props.letter;
		let { keywords } = this.props.letter;
		keywords = (keywords != null && keywords.hasOwnProperty('words')) ?
			keywords.words.join(', ') :
			null;

		return (
			<div className="record">
				<aside>
					<Meta {...meta} keywords={keywords} />
				</aside>
				<div className="text">
					<div dangerouslySetInnerHTML={{__html: tei}} />
					<ul className="similar-letters">
						{
							simLetters &&
							simLetters.letters.map((l, i) =>
								<li key={i}>sim</li>
							)
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default Record;
