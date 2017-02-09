import * as React from 'react';
import Field from './field';

export default ({
	appendixOf,
	date,
	extra,
	extraFields,
	id,
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
			<Field label="ID">{id}</Field>
			<Field label="Date">{date}</Field>
			<Field label="Sender">{sender}</Field>
			<Field label="Recipient">{recipient}</Field>
			<Field label="Language">{language}</Field>
			<Field label="Appendix of">{appendixOf}</Field>
			<Field label="Keywords">{keywords}</Field>
		</ul>
	</div>;
