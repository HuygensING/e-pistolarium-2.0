import {backendUrl} from "./constants";
const url = (id) => `${backendUrl}letters/${id}/tei`;

export default (app, state) => {
	app.get('/tei', async (req, res) => {
		const result = await fetch(url(req.query.id));
		const tei = await result.text();
		res.send(tei.replace(/xml\:id/g, 'xml-id'));
	});
}
