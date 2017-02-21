import * as React from 'react';
import { connect } from 'react-redux';
import { IMessage } from '../../interfaces';
import { removeOldestMessage } from '../../actions/message';
import { userLogin } from '../../actions/user';
import Message from '../messages/index';

interface IEventsProps {
	activeMessages: IMessage[];
	userLogin: (form: any) => void;
	unsetCurrentMessage: () => void;
}

class Login extends React.Component<IEventsProps, {}> {
	public render() {
		return (
			<div className="login">
				<Message
					messagess={this.props.activeMessages}
					removeOldestMessage={this.props.removeOldestMessage}
				/>
				<form>
					<ul>
						<li>
							<input
								name="email_address"
								placeholder="Email address"
								type="text"
							/>
						</li>
						<li>
							<input
								name="password"
								placeholder="Password"
								type="password"
							/>
						</li>
						<li>
							<div
								className="submit"
								onClick={this.submit}
							>
								Submit
							</div>
						</li>
					</ul>
				</form>
			</div>
		);
	}

	private submit = (ev) => {
		const form = document.querySelector('form');
		const formData = new FormData(form);
		this.props.userLogin(formData);
	}
}

export default connect(
	(state) => ({
		message: state.message.currentMessage,
	}),
	{
		userLogin,
		removeOldestMessage,
	},
)(Login);
