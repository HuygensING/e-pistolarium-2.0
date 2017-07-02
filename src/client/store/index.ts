import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import history from './history';
const logger = (/* store */) => next => action => {
	if (action.hasOwnProperty('type')) {
		console.log('[REDUX]', action.type, action);
	}

	return next(action);
};
//
// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);
//
// const data = combineReducers({
// 	...reducers,
// 	routing: routerReducer,
// });
//
// export default createStoreWithMiddleware(data, window['SERVER_STATE']);


// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export default createStore(
	combineReducers({
		...reducers,
		router: routerReducer
	}),
	applyMiddleware(middleware, thunkMiddleware, logger)
);

