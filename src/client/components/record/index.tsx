import * as React from 'react';
import * as cx from 'classnames';
import Meta from './meta';
import NewAnnotation from './new-annotation';

interface IRecordProps {
	createAnnotation: () => void;
	fetchLetter: (id: string) => void;
	letter: any;
	newAnnotationRange: Range;
	params: any;
}

class Record extends React.Component<IRecordProps, null> {
	public state = {
		dates: true,
		persons: true,
		places: true,
	};

	public componentDidMount() {
		this.props.fetchLetter(this.props.params.id);
		document.addEventListener('mouseup', this.props.createAnnotation);
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
				<aside>
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
								<li key={i}>sim</li>
							)
						}
					</ul>
				</div>
				<NewAnnotation {...this.props} />
			</div>
		)
	}
}

export default Record;
