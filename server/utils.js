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
    makeHeadersFor,
    copyObject
}