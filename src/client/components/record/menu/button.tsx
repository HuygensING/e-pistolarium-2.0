import * as React from 'react';
import * as cx from 'classnames';

interface IButtonProps {
	className?: string;
	onClick: (ev: Event) => void;
	toggle?: boolean;
}

interface IButtonState {
	active: boolean;
}

class Button extends React.Component<IButtonProps, IButtonState> {
	public state = {
		active: false,
	};

	private handleClick = (ev) => {
		if (this.props.onClick != null) {
			this.props.onClick(ev);
		}

		if (this.props.toggle) {
			this.setState({ active: !this.state.active });
		}
	};

	public render() {
		return (
			<div
				className={cx('button', this.props.className, {
					active: this.state.active,
				})}
				onClick={this.handleClick}
			>
				{this.props.children}
			</div>
		);
	}
}

export default Button;
