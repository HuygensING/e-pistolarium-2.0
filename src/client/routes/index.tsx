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
				  path="letters/:id/:subId"
				/>
			</Route>
			<Route
				component={Login}
				path="/login"
			/>
		</Router>
	</Provider>
);
