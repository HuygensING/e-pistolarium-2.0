import * as React from 'react';

const Field = ({ label, value }) =>
	(value != null && value !== '') ?
		<li>
			<div className="label">{label}</div>
			<div className="value">{value}</div>
		</li> :
		null;

export default ({
	appendixOf,
	date,
	extra,
	extraFields,
	keywords,
	language,
	pid,
	recipient,
	recipientLoc,
	sender,
	senderLoc,
}) =>
	<div className="meta">
		<ul>
			<Field label="Date" value={date}/>
			<Field label="Sender" value={sender}/>
			<Field label="Recipient" value={recipient}/>
			<Field label="Language" value={language}/>
			<Field label="Appendix of" value={appendixOf}/>
			<Field label="Keywords" value={keywords}/>
		</ul>
	</div>;
