import * as React from 'react';
import { connect } from 'react-redux';
import { unsetCurrentMessage } from '../actions/message';
import Message from './message/index';
import { fetchLetter } from "../actions/letter";
import {createAnnotation, removeNewAnnotation} from "../actions/annotation";

const App = (props) =>
	<div className="app">
		<Message
			message={props.message}
			unsetCurrentMessage={props.unsetCurrentMessage}
		/>
		<header><h1>Circulation of Knowledge and Learned Practices in the 17th-century Dutch Republic</h1></header>
		<div className="body">
			{React.cloneElement(props.children, {...props})}
		</div>
	</div>;

export default connect(
	(state) => ({
		letter: state.letter.current,
		message: state.message.currentMessage,
		newAnnotationRange: state.annotation.range,
		newAnnotationText: state.annotation.text,
	}),
	{
		createAnnotation,
		fetchLetter,
		removeNewAnnotation,
		unsetCurrentMessage,
	},
)(App);
