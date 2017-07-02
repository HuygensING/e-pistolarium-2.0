import * as React from 'react';

const sluggify = (str) =>
	str
		.toLowerCase()
		.replace(/,/g, '')
		.replace(/\(|\)/g, '')
		.replace(/\s/g, '-');

export default (props) =>
	(props.children != null && props.children.length) ?
		<li className={`field ${sluggify(props.label)}`}>
			<div className="label">{props.label}</div>
			<div className="value">{props.children}</div>
		</li> :
		null;

