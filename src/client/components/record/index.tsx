import * as React from 'react';
import * as cx from 'classnames';
import Meta from './meta';
import NewAnnotation from './new-annotation';
import SimilarLetters from './similar-letters';
import Menu from './menu';

interface IRecordProps {
	createAnnotation: () => void;
	fetchLetter: (id: string, subId: string) => void;
	goToLetter: (letter) => void;
	letter: any;
	newAnnotationRange: Range;
	newAnnotationText: string;
	nextLetter: any;
	removeNewAnnotation: () => void;
	params: any;
	prevLetter: any;
}

interface IRecordState {
	dates: boolean;
	persons: boolean;
	places: boolean;
}

class Record extends React.Component<IRecordProps, IRecordState> {
	public state = {
		dates: false,
		persons: false,
		places: false,
	};

	private articleNode: HTMLElement;

	public componentDidMount() {
		const { id, subId } = this.props.params;
		this.props.fetchLetter(id, subId);
		this.articleNode.addEventListener('mouseup', this.props.createAnnotation);
	}

	public componentWillReceiveProps(nextProps) {
		const { id, subId } = nextProps.params;
		this.props.fetchLetter(id, subId);
	}

	public componentWillUnmount() {
		this.articleNode.removeEventListener('mouseup', this.props.createAnnotation);
	}

	private handleToggleAnnotationType = (type) => {
		this.setState({
			[type]: !this.state[type],
		});
	};

	public render() {
		const { meta, pid, simLetters, tei, text } = this.props.letter;
		let { keywords } = this.props.letter;
		keywords = (keywords != null && keywords.hasOwnProperty('words')) ?
			keywords.words.join(', ') :
			null;

		return (
			<div className={cx('record', {
				'create-annotation': this.props.newAnnotationRange != null,
				dates: this.state.dates,
				persons: this.state.persons,
				places: this.state.places,
			})}>
				<Menu
					goToLetter={this.props.goToLetter}
					nextLetter={this.props.nextLetter}
					prevLetter={this.props.prevLetter}
					toggleAnnotationType={this.handleToggleAnnotationType}
				/>
				<aside className="left">
					<Meta {...meta} keywords={keywords} id={pid} />
				</aside>
				<article
					className="letter"
				  ref={(el) => {
				  	this.articleNode = el;
				  }}
				>
					<div
						className="text"
						dangerouslySetInnerHTML={{__html: tei}}
					/>
					<SimilarLetters similarLetters={simLetters} />
				</article>
				<aside className="right">
					<NewAnnotation {...this.props} />
				</aside>
			</div>
		)
	}
}

export default Record;
