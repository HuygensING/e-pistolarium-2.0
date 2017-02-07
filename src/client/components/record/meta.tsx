import * as React from 'react';

const Field = ({ label, value }) =>
	<li>
		<div className="label">{label}</div>
		<div className="value">{value}</div>
	</li>;

export default ({
	appendixOf,
	date,
	extra,
	extraFields,
	language,
	pid,
	recipient,
	recipientLoc,
	sender,
	senderLoc,
}) =>
	<div className="meta">
		<ul>
			<Field label="Date" value={date} />
			<Field label="Sender" value={sender} />
			<Field label="Recipient" value={recipient} />
			<Field label="Language" value={language} />
			<Field label="Appendix of" value={appendixOf} />
		</ul>
	</div>;
