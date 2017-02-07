import * as React from 'react';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router } from 'react-router';
import App from '../components/app';
import Home from '../components/home';
import Login from '../components/login';
import Record from '../components/record';
import store from '../store';
import history from './history';

export default (
	<Provider store={store}>
		<Router history={history}>
			<Route
				component={App}
				path="/"
			>
				<IndexRoute component={Home} />
				<Route
					component={Record}
				  path="letter/:id"
				/>
			</Route>
			<Route
				component={Login}
				path="/login"
			/>
		</Router>
	</Provider>
);
// onEnter={(nextState, replace, cb) => {
// 	const state = store.getState();
// 	console.log(state.user.token);
// 	if (state.user.token == null) replace('/login');
// 	cb();
// }}
