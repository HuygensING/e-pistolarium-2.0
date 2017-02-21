import * as React from 'react';
import { connect } from 'react-redux';
import { removeOldestMessage } from '../actions/message';
import Messages from './messages';
import {fetchLetter, goToLetter} from "../actions/letter";
import { receiveSearchResult } from "../actions/search";
import {createAnnotation, removeNewAnnotation} from "../actions/annotation";

const App = (props) =>
	<div className="app">
		<Messages
			messages={props.activeMessages}
			removeOldestMessage={props.removeOldestMessage}
		/>
		<header><h1>Circulation of Knowledge and Learned Practices in the 17th-century Dutch Republic</h1></header>
		<div className="body">
			{React.cloneElement(props.children, {...props})}
		</div>
	</div>;

export default connect(
	(state) => ({
		letter: state.letter.current,
		activeMessages: state.message.activeMessages,
		nextLetter: state.search.nextLetter,
		newAnnotationRange: state.annotation.range,
		newAnnotationText: state.annotation.text,
		prevLetter: state.search.prevLetter,
	}),
	{
		createAnnotation,
		goToLetter,
		fetchLetter,
		receiveSearchResult,
		removeNewAnnotation,
		removeOldestMessage,
	},
)(App);
