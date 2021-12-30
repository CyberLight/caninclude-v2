const polka = require('polka');
const send = require('@polka/send-type');
const { PORT=8080 } = process.env;

const isProd = process.env.NODE_ENV === 'production';
const staticMiddleware = require('sirv')('build', { 
	single: true, 
	dev: !isProd
});
const { caninclude } = require('./api.js');

function onError(err, req, res) {
  console.error(`> ERROR: ${req.method}(${req.url}) ~>`, err);
  const data = { ok: false, message: 'Oops! Something went wrong!', type: 'warning' };
  send(res, 500, data)
}

let app = polka({ onError });
	app.use((req, res, next) => {
		if (!req.headers['x-forwarded-proto'] || req.headers['x-forwarded-proto'].indexOf('https') !== -1) {
			return next();
		}
		const url = `https://${req.headers.host}${req.url}`;
		let str = `Redirecting to ${url}`;
		res.writeHead(301, {
			Location: url,
			'Content-Type': 'text/plain',
			'Content-Length': str.length
		});
		res.end(str);
	})
	app.use((req, res, next) => {
		try {
			if (req.path === '/api/caninclude' && req.method === 'GET') {
				return caninclude(req, res);
			}
		} catch (e) {
			return next(e);
		}
		return next();
	})
	if (isProd) {
		app.use(staticMiddleware);
	}
	app.listen(PORT, () => {
		console.log(`> Running on localhost:${PORT}`);
	});