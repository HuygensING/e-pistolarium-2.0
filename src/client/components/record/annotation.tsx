import * as React from 'react';
import Field from './field';

export default ({ annotation, cancelAnnotation })	=>
	<div className="annotation">
		<h4>Annotation</h4>
		<div className="body">
			<ul>
				<Field label="Selected text">
					<span className="left-double-quote">“</span>
					<span className="text">{annotation.selectedText}</span>
					<span className="right-double-quote">”</span>
				</Field>
				<Field label="Name">
					{annotation.name}
				</Field>
				<Field label="Birth date">
					{annotation.birthDate}
				</Field>
				<Field label="Death date">
					{annotation.deathDate}
				</Field>
			</ul>
			<footer>
				<div
					className="cancel"
					onClick={cancelAnnotation}
				>
					Cancel
				</div>
			</footer>
		</div>
	</div>;
