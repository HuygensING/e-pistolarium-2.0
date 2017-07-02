import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';

const Messages = (props) =>
	<ul className="messages">
		{
			props.messages.map((message, i) =>
				<li
					className={cx('message', message.type)}
					key={i}
				>
					{message.value}
				</li>
			)
		}
	</ul>;

export default connect(
	state => ({
		messages: []
	})
)(Messages);
