import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import Meta from './meta';
import NewAnnotation from './new-annotation';
import Annotation from './annotation';
import Menu from './menu';
import Article from './article';
import {INewAnnotation, IAnnotation} from "../../reducers/annotation";
import {
	cancelAnnotation, createAnnotation, removeNewAnnotation,
	saveNewAnnotation, setActiveAnnotation
} from "../../actions/annotation/index";
import {fetchLetter, goToLetter} from "../../actions/letter";

interface IRecordProps {
	annotation: IAnnotation;
	cancelAnnotation: () => void;
	createAnnotation: () => void;
	fetchLetter: (id: string, subId: string) => void;
	goToLetter: (letter) => void;
	letter: any;
	newAnnotation: INewAnnotation;
	nextLetter: any;
	removeNewAnnotation: () => void;
	saveNewAnnotation: () => void;
	setActiveAnnotation: (id: string) => void;
	match: any;
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
		const { id, subId } = this.props.match.params;
		this.props.fetchLetter(id, subId);
	}

	public componentWillReceiveProps(nextProps) {
		const {id, subId} = nextProps.match.params;
		this.props.fetchLetter(id, subId);
	}

	private handleToggleAnnotationType = (type) => {
		this.setState({
			[type]: !this.state[type],
		});
	};

	public render() {
		const {
			annotation,
			goToLetter,
			letter,
			newAnnotation,
			nextLetter,
			prevLetter
		} = this.props;
		const { meta, pid } = letter;
		let { keywords } = letter;
		keywords = (keywords != null && keywords.hasOwnProperty('words')) ?
			keywords.words.join(', ') :
			null;

		return (
			<div className={cx('record', {
				'show-aside': newAnnotation.text != null || annotation.name != null,
				dates: this.state.dates,
				persons: this.state.persons,
				places: this.state.places,
			})}>
				<Menu
					{...this.state}
					goToLetter={goToLetter}
					nextLetter={nextLetter}
					prevLetter={prevLetter}
					toggleAnnotationType={this.handleToggleAnnotationType}
				/>
				<aside className="left">
					<Meta {...meta} keywords={keywords} id={pid} />
				</aside>
				<Article {...this.props} />
				<aside className="right">
					{
						newAnnotation.text != null &&
						<NewAnnotation {...this.props} />
					}
					{
						annotation.name != null &&
						<Annotation {...this.props} />
					}
				</aside>
			</div>
		)
	}
}

export default connect(
	state => ({
		annotation: state.annotation.active,
		letter: state.letter.current,
		nextLetter: state.search.nextLetter,
		newAnnotation: state.annotation.new,
		prevLetter: state.search.prevLetter,
	}),
	{
		cancelAnnotation,
		createAnnotation,
		fetchLetter,
		goToLetter,
		removeNewAnnotation,
		saveNewAnnotation,
		setActiveAnnotation,
	}
)(Record);

