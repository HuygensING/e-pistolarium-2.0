import * as React from 'react';
import SimilarLetters from './similar-letters';
import wrapTextNodes from '../../../utils/wrap-text-nodes';

interface IArticleProps {
	createAnnotation: () => void;
	letter: any;
	setActiveAnnotation: (id: string, selectedText: string) => void;
}

class Article extends React.Component<IArticleProps, null> {
	private articleNode: HTMLElement;

	public componentDidMount() {
		this.articleNode.addEventListener('mouseup', this.props.createAnnotation);
	}

	public componentDidUpdate(prevProps) {
		const { text } = this.props.letter;
		if (text != null && text != prevProps.letter.text) {
			const userAnnotationBeginTags = this.articleNode
				.querySelectorAll('.userannotation[data-type="begin"]');

			const userAnnotationTags = Array.from(userAnnotationBeginTags)
				.reduce((obj: Object, currNode: HTMLElement) => {
					const id = currNode.dataset['link'];
					const endNode = this.articleNode
						.querySelector(`.userannotation[data-type="end"][data-link="${id}"]`)
					obj[id] = [currNode, endNode];
					return obj;
				}, {});

			Object.keys(userAnnotationTags).forEach((key) => {
				const [node1, node2] = userAnnotationTags[key];
				wrapTextNodes(node1, node2, { className: 'user-annotation-text'});
			})
		}
	}

	public componentWillUnmount() {
		this.articleNode.removeEventListener('mouseup', this.props.createAnnotation);
	}

	private handleClick = (ev) => {
		if (ev.target.matches('.persname[data-xref]')) {
			const id = ev.target.getAttribute('data-xref');
			this.props.setActiveAnnotation(id, ev.target.innerText)
		}
	};

	render() {
		const { simLetters, text } = this.props.letter;

		return (
			<article
				className="letter"
			>
				<div
					className="text"
					dangerouslySetInnerHTML={{__html: text}}
					onClick={this.handleClick}
					ref={(el) => {
				  	this.articleNode = el;
				  }}
				/>
				<SimilarLetters similarLetters={simLetters} />
			</article>
		);
	}
}

export default Article;
