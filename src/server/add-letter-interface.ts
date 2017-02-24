import {backendUrl} from "./constants";
import xml2html, { BaseTag } from 'hi-xml2html';
const url = (id) => `${backendUrl}letters/${id}/tei`;

class Br extends BaseTag {
	open() {
		return '<br>';
	}

	close() {
		return '';
	}
}

export default (app, state) => {
	app.get('/tei', async (req, res) => {
		const result = await fetch(url(req.query.id));
		const tei = await result.text();
		const parsedTei = await xml2html(tei, { tags: {lb: Br}});
		res.send(parsedTei
			.replace(/xml\:id/g, 'xml-id')
		);
	});
}
