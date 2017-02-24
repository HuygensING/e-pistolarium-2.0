import * as React from 'react';
import * as cx from 'classnames';

interface IButtonProps {
	active?: boolean;
	className?: string;
	onClick: (ev: Event) => void;
}

class Button extends React.Component<IButtonProps, null> {
	private handleClick = (ev) => {
		if (this.props.onClick != null) {
			this.props.onClick(ev);
		}
	};

	public render() {
		return (
			<div
				className={cx('button', this.props.className, {
					active: this.props.active,
				})}
				onClick={this.handleClick}
			>
				{this.props.children}
			</div>
		);
	}
}

export default Button;
