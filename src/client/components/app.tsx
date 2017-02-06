import * as React from 'react';
import { connect } from 'react-redux';
import { unsetCurrentMessage } from '../actions/message';
import Message from './message/index';

const App = (props) =>
	<div className="app">
		<Message
			message={props.message}
			unsetCurrentMessage={props.unsetCurrentMessage}
		/>
		<header><h1>ePistolarium 2.0</h1></header>
		<div className="body">
			{React.cloneElement(props.children, {...props})}
		</div>
	</div>;

export default connect(
	(state) => ({
		message: state.message.currentMessage,
	}),
	{
		unsetCurrentMessage,
	},
)(App);
