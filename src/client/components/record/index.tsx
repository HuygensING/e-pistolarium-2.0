import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router';
import Meta from './meta';
import NewAnnotation from './new-annotation';

interface IRecordProps {
	createAnnotation: () => void;
	fetchLetter: (id: string, subId: string) => void;
	letter: any;
	newAnnotationRange: Range;
	newAnnotationText: string;
	removeNewAnnotation: () => void;
	params: any;
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
		document.addEventListener('mouseup', this.props.createAnnotation);
	}

	public componentWillReceiveProps(nextProps) {
		const { id, subId } = nextProps.params;
		this.props.fetchLetter(id, subId);
	}

	public componentWillUnmount() {
		document.removeEventListener('mouseup', this.props.createAnnotation);
	}

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
				<aside className="left">
					<Meta {...meta} keywords={keywords} id={pid} />
				</aside>
				<div className="letter">
					<div
						className="text"
						dangerouslySetInnerHTML={{__html: tei}}
					/>
					<ul className="similar-letters">
						{
							simLetters &&
							simLetters.letters.map((l, i) =>
								<li key={i}>
									<Link to={`/letters/${l.id}`}>{l.title}</Link>
								</li>
							)
						}
					</ul>
				</div>
				<aside className="right">
					<NewAnnotation {...this.props} />
				</aside>
			</div>
		)
	}
}

export default Record;
