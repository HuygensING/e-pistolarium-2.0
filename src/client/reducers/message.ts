import Queue from '../utils/queue';
import { IMessage } from '../interfaces';

interface IState {
	activeMessages: IMessage[];
	messages: IMessage[];
}

const messages = new Queue();
const activeMessages = new Queue();
const initialState: IState = {
	activeMessages: activeMessages.values(),
	messages: messages.values(),
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'ADD_MESSAGE': {
			messages.add(action.message);
			activeMessages.add(action.message);
			nextState = { ...nextState, ...{
				activeMessages: activeMessages.values(),
				messages: messages.values(),
			}};
			break;
		}

		case 'REMOVE_MESSAGE': {
			activeMessages.removeOldest();
			nextState = { ...nextState, ... {
				activeMessages: activeMessages.values(),
			}};
			break;
		}

		default:
	}

	return nextState;
};
