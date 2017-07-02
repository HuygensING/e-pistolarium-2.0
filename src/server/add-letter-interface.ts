import {backendUrl} from "./constants";
import xml2html, { HtmlTag } from 'hi-xml2html';
const url = (id) => `${backendUrl}letters/${id}/tei`;

class Br extends HtmlTag {
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
		const parsedTei = await xml2html(tei, {
			getComponent: (node) => {
				if (node.name === 'lb') return Br;
			}
		});
		res.send(parsedTei.output.replace(/xml\:id/g, 'xml-id'));
	});
}
