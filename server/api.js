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

function makeHeadersFor(jsonData) {
	const TYPE = 'Content-Type';
	const LENGTH = 'Content-Length';
	const headers = {};
	headers[TYPE] = 'application/json';
	headers[LENGTH] = jsonData.length;
	return headers;
}

function copyObject(o) {
	return {...o};
}

module.exports = {
	caninclude: (req, res) => {
		const { child, parent, childParams, parentParams } = req.query;
		const requiredQueryParams = [child, parent];

		if (!requiredQueryParams.every(Boolean)) {
			const data = JSON.stringify({ ok: false, message: 'Please set "child" and "parent" parameters',  type: 'warning' });
			res.writeHead(400, makeHeadersFor(data));
			return res.end(data);
		}

		const filteredTags = spec
			.filter((tag) => [child, parent].includes(tag.tag));
			
		if (filteredTags.length < 2 && child !== parent) {
			const data = JSON.stringify({ ok: false, message: 'Some values from parameters were not found',  type: 'warning' });
			res.writeHead(400, makeHeadersFor(data));
			return res.end(data);
		}

		const tags = filteredTags.reduce((o, tag) => ({[tag.tag]: tag, ...o}), {});	
		const result = { child: copyObject(tags[child]), parent: copyObject(tags[parent]) };
		result.child.params = copyObject(params[child].params);
		result.parent.params = copyObject(params[parent].params);
		const childParamsList = get(result, 'child.params.Categories', []);
		const parentParamsList = get(result, 'parent.params.ContentModel', []);

		const toObject = (distinct, line) => ({[line.hashText]: line, ...distinct});
		const onlyMatchedHref = (paramsList) => (line) => typeof line !== 'string' && paramsList.includes(line.hashText);

		const childParamList = result.child.Categories
			.flatMap((block) => block.filter(onlyMatchedHref(childParamsList))).reduce(toObject, {});

		const parentParamList = result.parent.ContentModel
			.flatMap((block) => block.filter(onlyMatchedHref(parentParamsList))).reduce(toObject, {});

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
		res.writeHead(200, makeHeadersFor(data));
		res.end(data);
	}
}