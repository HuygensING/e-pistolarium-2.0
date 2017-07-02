import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';

const logger = (/* store */) => next => action => {
	if (action.hasOwnProperty('type')) {
		console.log('[REDUX]', action.type, action);
	}

	return next(action);
};

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);

reducers['routing'] = routerReducer;
const data = combineReducers(reducers);

export default createStoreWithMiddleware(data);
