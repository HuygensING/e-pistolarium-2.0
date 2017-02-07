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
		console.log(this.props.letter);
		const { keywords, meta, simLetters, tei, text } = this.props.letter;

		return (
			<div className="record">
				<aside>
					<Meta {...meta} />
					<div className="keywords">
						{keywords && keywords.words}
					</div>
					<div className="similar-letters">
						{simLetters && simLetters.letters}
					</div>
				</aside>
				<div
					className="text"
				  dangerouslySetInnerHTML={{__html: tei}}
				/>
			</div>
		)
	}
}

export default Record;
