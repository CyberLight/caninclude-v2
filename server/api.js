const polka = require('polka');
const spec = require('./spec.json');
const params = require('./params.json');
const {CanincludeAnalyzer, rules} = require('caninclude-analyzer');
const analyzer = new CanincludeAnalyzer(rules);

const resultsMap = {
	true: 'can',
	false: 'cant',
	unknown: 'doubt'
}

module.exports = polka()
	.get('/caninclude', (req, res) => {
		const { child, parent, childParams, parentParams } = req.query;
        res.statusCode = 200;
		const filteredTags = spec.filter(
			(tag) => [child, parent].includes(tag.tag))
			.reduce((o, tag) => ({[tag.tag]: tag, ...o}), {});
		const result = { child: filteredTags[child], parent: filteredTags[parent] };
		result.child.params = params[child].params;
		result.parent.params = params[parent].params;
		result.can = resultsMap[analyzer.canInclude({ name: child, params: childParams }, { name: parent, params: parentParams })];
		res.end(JSON.stringify({ ok: true, result }));
	});