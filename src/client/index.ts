import * as ReactDOM from 'react-dom';
import routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container');
	ReactDOM.render(routes, container);
});
