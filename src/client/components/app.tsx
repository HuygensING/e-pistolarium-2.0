import * as React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'

import Login from './login';
import Messages from './messages';
import Home from './home';
import Record from './record';
import Json2react from './json2react';

import store from '../store';
import history from '../store/history';
import styled from "styled-components";

const App = styled.div`
	height: 100%;
`;

export default () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App>
				<header>
					<h1>Circulation of Knowledge and Learned Practices in the 17th-century Dutch Republic</h1>
				</header>
				<Route
					component={Home}
					exact
					path="/"
				/>
				<Route
					component={Record}
					path="/letters/:id/:subId"
				/>
				<Route
					component={Login}
					path="/login"
				/>
				<Route
					component={Json2react}
					path="/json2react"
				/>
				<Messages />
			</App>
		</ConnectedRouter>
	</Provider>
);
