import * as React from 'react';
import Field from './field';

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
			<Field label="Date">{date}</Field>
			<Field label="Sender">{sender}</Field>
			<Field label="Recipient">{recipient}</Field>
			<Field label="Language">{language}</Field>
			<Field label="Appendix of">{appendixOf}</Field>
			<Field label="Keywords">{keywords}</Field>
		</ul>
	</div>;
