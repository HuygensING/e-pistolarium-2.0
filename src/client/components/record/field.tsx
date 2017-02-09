import * as React from 'react';

const sluggify = (str) =>
	str
		.toLowerCase()
		.replace(/,/g, '')
		.replace(/\(|\)/g, '')
		.replace(/\s/g, '-');

export default ({ children, label }) =>
	(children != null && children.length) ?
		<li className={`field ${sluggify(label)}`}>
			<div className="label">{label}</div>
			<div className="value">{children}</div>
		</li> :
		null;

