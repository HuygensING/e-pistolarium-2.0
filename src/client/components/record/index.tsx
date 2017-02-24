import * as React from 'react';
import * as cx from 'classnames';
import Meta from './meta';
import NewAnnotation from './new-annotation';
import Menu from './menu';
import Article from './article';

interface IRecordProps {
	createAnnotation: () => void;
	fetchLetter: (id: string, subId: string) => void;
	goToLetter: (letter) => void;
	letter: any;
	newAnnotationOffset: number;
	newAnnotationRange: Range;
	newAnnotationText: string;
	nextLetter: any;
	removeNewAnnotation: () => void;
	saveNewAnnotation: () => void;
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
		dates: true,
		persons: true,
		places: true,
	};

	public componentDidMount() {
		const { id, subId } = this.props.params;
		this.props.fetchLetter(id, subId);
	}

	public componentWillReceiveProps(nextProps) {
		const {id, subId} = nextProps.params;
		this.props.fetchLetter(id, subId);
	}

	private handleToggleAnnotationType = (type) => {
		this.setState({
			[type]: !this.state[type],
		});
	};

	public render() {
		const { meta, pid } = this.props.letter;
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
					{...this.state}
					goToLetter={this.props.goToLetter}
					nextLetter={this.props.nextLetter}
					prevLetter={this.props.prevLetter}
					toggleAnnotationType={this.handleToggleAnnotationType}
				/>
				<aside className="left">
					<Meta {...meta} keywords={keywords} id={pid} />
				</aside>
				<Article {...this.props} />
				<aside className="right">
					<NewAnnotation {...this.props} />
				</aside>
			</div>
		)
	}
}

export default Record;
