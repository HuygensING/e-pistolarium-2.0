import * as React from 'react';
import Meta from './meta';

interface IRecordProps {
	fetchLetter: (id: string) => void;
	letter: any;
	params: any;
}

class Record extends React.Component<IRecordProps, null> {
	public componentDidMount() {
		this.props.fetchLetter(this.props.params.id);
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
