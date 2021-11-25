const polka = require('polka');
const spec = require('./spec.json');
const params = require('./params.json');

module.exports = polka()
	.get('/caninclude', (req, res) => {
		const { child, parent } = req.query;
        res.statusCode = 200;
		const filteredTags = spec.filter(
			(tag) => [child, parent].includes(tag.tag))
			.reduce((o, tag) => ({[tag.tag]: tag, ...o}), {});
		const result = { child: filteredTags[child], parent: filteredTags[parent] };
		result.child.params = params[child].params;
		result.parent.params = params[parent].params;
		res.end(JSON.stringify({ ok: true, result }));
	});