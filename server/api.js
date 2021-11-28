const polka = require('polka');
const get = require('lodash/get');
const spec = require('./spec.json');
const params = require('./params.json');
const {CanincludeAnalyzer, rules} = require('caninclude-analyzer');
const analyzer = new CanincludeAnalyzer(rules);

const TYPE = 'Content-Type';
const LENGTH = 'Content-Length';

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
		result.include = analyzer.canInclude(
			{ name: child, params: childParams }, 
			{ name: parent, params: parentParams }, 
			true
		);
		result.include.can = resultsMap[result.include.can];
		if (result.include.alternative) {
			result.include.alternative = {
				...result.include.alternative,
				can: resultsMap[result.include.alternative.can],
			};
		}
		const data = JSON.stringify({ ok: true, result });
		const headers = {};
		headers[TYPE] = 'application/json';
		headers[LENGTH] = data.length;
		res.writeHead(200, headers);
		res.end(data);
	});