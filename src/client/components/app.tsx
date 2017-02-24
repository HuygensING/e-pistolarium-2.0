import * as React from 'react';
import { connect } from 'react-redux';
import Messages from './messages';
import {fetchLetter, goToLetter} from "../actions/letter";
import { receiveSearchResult } from "../actions/search";
import {
	createAnnotation,
	removeNewAnnotation,
	saveNewAnnotation,
	setActiveAnnotation,
	cancelAnnotation,
} from "../actions/annotation/index";

const App = (props) =>
	<div className="app">
		<Messages
			messages={props.activeMessages}
		/>
		<header><h1>Circulation of Knowledge and Learned Practices in the 17th-century Dutch Republic</h1></header>
		<div className="body">
			{React.cloneElement(props.children, {...props})}
		</div>
	</div>;

export default connect(
	(state) => ({
		annotation: state.annotation.active,
		letter: state.letter.current,
		// TODO rename to 'messages' (remove 'active')
		activeMessages: state.message.activeMessages,
		nextLetter: state.search.nextLetter,
		newAnnotation: state.annotation.new,
		prevLetter: state.search.prevLetter,
	}),
	{
		cancelAnnotation,
		createAnnotation,
		goToLetter,
		fetchLetter,
		receiveSearchResult,
		removeNewAnnotation,
		saveNewAnnotation,
		setActiveAnnotation,
	},
)(App);
