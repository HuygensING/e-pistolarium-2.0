import Queue from '../utils/queue';
import { IMessage } from '../interfaces';

interface IState {
	currentMessage: IMessage;
	messages: IMessage[];
}

const emptyMessage = {
	type: null,
	value: null,
};
const messages = new Queue();
const initialState: IState = {
	currentMessage: emptyMessage,
	messages: messages.get(),
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_MESSAGE': {
			messages.add(action.message);
			nextState = { ...nextState, ...{
				currentMessage: messages.last(),
				messages: messages.get(),
			}};
			break;
		}

		case 'UNSET_CURRENT_MESSAGE': {
			nextState = { ...nextState, ... {
				currentMessage: emptyMessage,
			}};
			break;
		}

		default:
	}

	return nextState;
};
