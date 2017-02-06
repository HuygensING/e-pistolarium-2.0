import * as React from 'react';
import * as cx from 'classnames';

export default ({ message, unsetCurrentMessage }) => {
	if (message.value == null) {
		return null;
	} else {
		setTimeout((() => unsetCurrentMessage()), 3000);
		return (
			<div className={cx('message', message.type)}>
				{message.value}
			</div>
		);
	}
}
