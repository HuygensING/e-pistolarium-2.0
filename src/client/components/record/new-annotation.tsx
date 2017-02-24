import * as React from 'react';
import Field from './field';
import {INewAnnotation} from "../../reducers/annotation";

interface INewAnnotationProps {
	newAnnotation: INewAnnotation;
	removeNewAnnotation: () => void;
	saveNewAnnotation: () => void;
}

class NewAnnotation extends React.Component<INewAnnotationProps, null> {
	public render() {
		return (
			<div className="new annotation">
				<h4>Create annotation</h4>
				<div className="body">
					<ul>
						<Field label="Selected text">
							<span className="left-double-quote">“</span>
							<span className="text">{this.props.newAnnotation.text}</span>
							<span className="right-double-quote">”</span>
						</Field>
						<Field label="Offset">
							{'' + this.props.newAnnotation.offset}
						</Field>
					</ul>
					<footer>
						<div
							className="cancel"
						  onClick={this.props.removeNewAnnotation}
						>
							Cancel
						</div>
						<div
							className="save"
							onClick={this.props.saveNewAnnotation}
						>
							Save
						</div>
					</footer>
				</div>
			</div>
		)
	}
}

export default NewAnnotation;
