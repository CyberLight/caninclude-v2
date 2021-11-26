const polka = require('polka');
const get = require('lodash/get');
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
		const childParamList = result.child.Categories
			.flatMap(
				(block) => block.filter(
					(line) => typeof line !== 'string' && get(result, 'child.params.Categories', [])
					.includes(line.hashText)
				)
			).reduce((distinct, line) => ({[line.hashText]: line, ...distinct}), {});
		const parentParamList = result.parent.ContentModel
			.flatMap(
				(block) => block.filter(
					(line) => typeof line !== 'string' && get(result, 'parent.params.ContentModel', [])
					.includes(line.hashText)
				)
			).reduce((distinct, line) => ({[line.hashText]: line, ...distinct}), {});

		result.child.params = Object.values(childParamList);
		result.parent.params = Object.values(parentParamList);
		result.can = resultsMap[analyzer.canInclude({ name: child, params: childParams }, { name: parent, params: parentParams })];
		res.end(JSON.stringify({ ok: true, result }));
	});