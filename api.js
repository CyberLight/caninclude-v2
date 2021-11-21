const polka = require('polka');

module.exports = polka()
	.get('/caninclude', (req, res) => {
        res.statusCode = 200;
		res.end(JSON.stringify({ ok: true }));
	});